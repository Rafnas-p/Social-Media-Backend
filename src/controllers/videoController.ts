
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadVideo } from "../Cloudnary/config";
import Video from "../models/Video";
import Shorts from "../models/Shorts";
import User from "../models/Users";
import { log } from "util";

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

    const { description, userId, title, category ,profil,userName ,channelId} = req.body;

    if (!userId || !description) {
      res
        .status(400)
        .json({ message: "Missing required fields: userId or description" });
      return;
    }

    const filePath = req.file.path;

    const result = await uploadVideo(filePath);
    
    fs.unlinkSync(filePath);

    let video;
    if (result.duration > 45) {
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
        channelId,
      
        
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
        channelId,
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




export const likeVideo = async (req: Request, res: Response) => {
  const { _id, uid } = req.body;

  
  if (!_id || !uid) {
    res.status(400).json({ message: "User ID and Video ID are required" });
    return;
  }

  try {
    const video = await Video.findById(_id);

    if (!video) {
      res.status(404).json({ message: "Video not found" });
      return;
    }

    if (video.likes.includes(uid)) {
      video.likes = video.likes.filter((userId) => userId !== uid);
      await video.save();

      res.status(200).json({
        message: "Like removed successfully",
        likesCount: video.likes.length,
        likes:video.likes
        
      });
      
      return;
    }

    // Add a like
    video.likes.push(uid);
    await video.save();

    res.status(200).json({
      message: "Video liked successfully",
      likesCount: video.likes.length,
      likes:video.likes
    });

  } catch (error: any) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const dislikeVideo = async (req: Request, res: Response) => {
  const { _id, uid } = req.body;

  if (!_id || !uid) {
    res.status(400).json({ message: "User ID and Video ID are required" });
    return;
  }

  try {
    const video = await Video.findById(_id);

    if (!video) {
      res.status(404).json({ message: "Video not found" });
      return;
    }

    if (video.likes.includes(uid)) {
      video.likes= video.likes.filter((userId) => userId !== uid);
      await video.save();

      res.status(200).json({
        message: "Dislike removed successfully",
        likesCount: video.likes.length,
        likes:video.likes
      });
    } 
  } catch (error:any) {
    console.error("Error disliking video:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

