import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_KEY_SECRET,
});

export const uploadVideo = async (filePath: string): Promise<any> => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: 'video', 
    });
    return result;
  } catch (error: any) {
    throw new Error('Error uploading video to Cloudinary: ' + error.message);
  }
};

