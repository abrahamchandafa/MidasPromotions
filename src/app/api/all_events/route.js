import { Storage } from "@google-cloud/storage";
import path from 'path'

const storage = new Storage({
    keyFilename: path.join(process.cwd(), "creds.json"),
  });
  
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const fileName = process.env.ALL_EVENTS_FILE_NAME
export async function GET(req) {
    try {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);
    
        const [contents] = await file.download();
        const jsonData = JSON.parse(contents.toString());
    
        return Response.json(jsonData);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
}