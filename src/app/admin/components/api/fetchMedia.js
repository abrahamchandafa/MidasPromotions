// pages/api/fetchImages.js
import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = 'YOUR_BUCKET_NAME';

export default async function handler(req, res) {
  const { page = 1, limit = 100 } = req.query; 
  const options = {
    delimiter: '/',
    maxResults: parseInt(limit, 10),
    pageToken: (page - 1) * limit,
  };

  try {
    const [files] = await storage.bucket(bucketName).getFiles(options);
    const images = files
      .filter(file => file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.jpeg') || file.name.endsWith('.webp')) 
      .map(file => ({
        name: file.name,
        publicUrl: `https://storage.googleapis.com/${bucketName}/${file.name}`,
      }));

    res.status(200).json({ images, nextPage: images.length === limit });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
}