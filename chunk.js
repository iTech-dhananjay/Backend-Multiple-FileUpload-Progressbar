import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import multer from "multer";
import fs from 'fs';
import dotenv from 'dotenv';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

// console.log(process.env.CLOUDINARY_API_KEY)
router.post('/upload', upload.single('file'), async (req, res) => {
  console.log('Hit');
  
  try {
    const result = await cloudinary.uploader.upload_stream((error, uploadResult) => {
      if (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ error: 'Error uploading to Cloudinary' });
      } else {
        console.log('Cloudinary Upload Success:', uploadResult);
        res.status(200).json({ message: 'File uploaded to Cloudinary successfully' });
      }
    }).end(req.file.buffer);

  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    res.status(500).json({ error: 'Error uploading to Cloudinary' });
  }
});

export default router;