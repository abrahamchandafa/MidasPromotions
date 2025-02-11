import { Storage } from "@google-cloud/storage";
import path from "path";
import { NextResponse } from "next/server";

const storage = new Storage({
  keyFilename: path.join(process.cwd(), "creds.json"),
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const fileName = process.env.ALL_EVENTS_FILE_NAME;
const imageFolder = "midas promotions event images";

export async function PUT(req) {
    try {
        const formData = await req.formData(); // Handle FormData for file uploads
        const updatedEvent = JSON.parse(formData.get("eventData")); // Get event data as JSON
        const smallEventImage = formData.get("smallEventImage");
        const largeEventImage = formData.get("largeEventImage");
    
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
    
        // Download and parse current JSON file
        const [contents] = await file.download();
        let jsonData = JSON.parse(contents.toString());
    
        // Find the event to update
        const eventIndex = jsonData.events.findIndex(event => event.id === updatedEvent.id);
    
        if (eventIndex === -1) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
    
        const existingEvent = jsonData.events[eventIndex];

        // Prepare image deletion promises
        const deletePromises = [];

        // Delete old small image if a new one is provided
        if (smallEventImage) {
            const smallImagePath = `${imageFolder}/${existingEvent.id}-small.${existingEvent.bucketImages.small.split('.').pop()}`;
            const smallImageFile = bucket.file(smallImagePath);
            deletePromises.push(smallImageFile.delete());
        }

        // Delete old large image if a new one is provided
        if (largeEventImage) {
            const largeImagePath = `${imageFolder}/${existingEvent.id}-large.${existingEvent.bucketImages.large.split('.').pop()}`;
            const largeImageFile = bucket.file(largeImagePath);
            deletePromises.push(largeImageFile.delete());
        }

            // Wait for deletions to complete
            await Promise.all(deletePromises);

        // Upload small image if available
        if (smallEventImage) {
            const smallFileExtension = smallEventImage.name.split(".").pop();
            const smallFileName = `${imageFolder}/${updatedEvent.id}-small.${smallFileExtension}`;
            const smallFile = bucket.file(smallFileName);

            const smallBuffer = Buffer.from(await smallEventImage.arrayBuffer());
            await smallFile.save(smallBuffer, {
                metadata: { contentType: smallEventImage.type },
            });

            // Make the file public
            await smallFile.makePublic();

            // Update event data with new small image name
            updatedEvent.bucketImages.small = `${updatedEvent.id}-small.${smallFileExtension}`;
        }

        // Upload large image if available
        if (largeEventImage) {
            const largeFileExtension = largeEventImage.name.split(".").pop();
            const largeFileName = `${imageFolder}/${updatedEvent.id}-large.${largeFileExtension}`;
            const largeFile = bucket.file(largeFileName);

            const largeBuffer = Buffer.from(await largeEventImage.arrayBuffer());
            await largeFile.save(largeBuffer, {
                metadata: { contentType: largeEventImage.type },
            });

            // Make the file public
            await largeFile.makePublic();

            // Update event data with new large image name
            updatedEvent.bucketImages.large = `${updatedEvent.id}-large.${largeFileExtension}`;
        }
    
        // Compare existing event with the updated event
        // If there are changes, update the existing event object with the new values
        jsonData.events[eventIndex] = {
            ...existingEvent,
            ...updatedEvent, // Spread operator to update properties
        };
    
        // Upload updated JSON back to GCS
        await file.save(JSON.stringify(jsonData, null, 2), {
            contentType: "application/json",
        });
    
        return NextResponse.json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

