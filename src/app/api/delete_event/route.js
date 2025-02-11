import { Storage } from "@google-cloud/storage";
import path from "path";
import { NextResponse } from "next/server";

const storage = new Storage({
  keyFilename: path.join(process.cwd(), "creds.json"),
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const imageFolder = "midas promotions event images"; // Folder where images are stored
const fileName = process.env.ALL_EVENTS_FILE_NAME;

export async function DELETE(req) {
  try {
    // Parse request body
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    // Get reference to the bucket and file
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Download current contents of the file
    const [contents] = await file.download();
    let jsonData = JSON.parse(contents.toString());

    // Ensure events array exists
    if (!jsonData.events) {
      return NextResponse.json({ error: "No events found" }, { status: 404 });
    }

    // Find the event to delete
    const eventToDelete = jsonData.events.find(event => event.id === id);

    if (!eventToDelete) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Delete associated images
    const imageSizes = ["small", "large"]; // The possible sizes
    const deletePromises = imageSizes.map(async (size) => {
      const imageFilePath = `${imageFolder}/${id}-${size}`; // Match any extension
      const [files] = await bucket.getFiles({ prefix: imageFilePath });

      return Promise.all(files.map(file => file.delete())); // Delete all matched files
    });

    await Promise.all(deletePromises);

    // Filter out the event from the JSON data
    jsonData.events = jsonData.events.filter(event => event.id !== id);

    // Upload updated JSON back to GCS
    await file.save(JSON.stringify(jsonData, null, 2), {
      contentType: "application/json",
    });

    return NextResponse.json({ success: true, message: "Event and associated images deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
