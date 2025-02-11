import { Storage } from "@google-cloud/storage";
import path from "path";
import { NextResponse } from "next/server";

const storage = new Storage({
  keyFilename: path.join(process.cwd(), "creds.json"),
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const fileName = process.env.ALL_EVENTS_FILE_NAME;
const imageFolder = "midas promotions event images";

export async function POST(req) {
  try {
    const formData = await req.formData(); // Handle FormData for file uploads
    const newEvent = JSON.parse(formData.get("eventData")); // Get event data as JSON
    const smallEventImage = formData.get("smallEventImage");
    const largeEventImage = formData.get("largeEventImage");

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Download and parse current JSON file
    const [contents] = await file.download();
    let jsonData = JSON.parse(contents.toString());

    // Ensure events array exists
    if (!jsonData.events) {
      jsonData.events = [];
    }

    // Upload small image if available
    if (smallEventImage) {
        const smallFileExtension = smallEventImage.name.split(".").pop();
        const smallFileName = `${imageFolder}/${newEvent.id}-small.${smallFileExtension}`;
        const smallFile = bucket.file(smallFileName);

        const smallBuffer = Buffer.from(await smallEventImage.arrayBuffer());
        await smallFile.save(smallBuffer, {
        metadata: { contentType: smallEventImage.type },
        });

        // Make the file public
        await smallFile.makePublic();

    }

    // Upload large image if available
    if (largeEventImage) {
        const largeFileExtension = largeEventImage.name.split(".").pop();
        const largeFileName = `${imageFolder}/${newEvent.id}-large.${largeFileExtension}`;
        const largeFile = bucket.file(largeFileName);

        const largeBuffer = Buffer.from(await largeEventImage.arrayBuffer());
        await largeFile.save(largeBuffer, {
        metadata: { contentType: largeEventImage.type },
        });

        // Make the file public
        await largeFile.makePublic();

    }

    // Append the new event to the JSON
    jsonData.events.push(newEvent);

    // Upload updated JSON back to GCS
    await file.save(JSON.stringify(jsonData, null, 2), {
      contentType: "application/json",
    });

    return NextResponse.json({
      success: true,
      message: "Event added successfully",
      event: newEvent,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
