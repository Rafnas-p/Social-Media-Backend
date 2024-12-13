
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadVideo } from "../Cloudnary/config";
import Video from "../models/Video";
import Shorts from "../models/Shorts";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/videos");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
export const videoUpload = upload.single("video");

export const uploadVideoToCloudinary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No video file uploaded" });
      return;
    }

    const { description, userId, title, category ,profil,userName } = req.body;

    if (!userId || !description) {
      res
        .status(400)
        .json({ message: "Missing required fields: userId or description" });
      return;
    }

    const filePath = req.file.path;

    const result = await uploadVideo(filePath);
    
    console.log(result);
    fs.unlinkSync(filePath);

    let video;
    if (result.duration > 60) {
      video = new Video({
        description,
        videoUrl: result.secure_url,
        publicId: result.public_id,
        duration: result.duration,
        userId,
        profil,
        userName,
        title,
        category,
        
      });
      await video.save(); 
    } else {
      video = new Shorts({
        description,
        videoUrl: result.secure_url,
        publicId: result.public_id,
        duration: result.duration,
        userId,
        profil,
        title,
        userName,
        category,
        isShort: true, 
      });
      await video.save(); 
    }

    res.status(200).json({
      message: "Video uploaded and saved successfully",
      data: video,
    });
  } catch (error: any) {
    console.error("Error uploading video:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const likeVideo =async (req:Request,res:Response)=>{

}