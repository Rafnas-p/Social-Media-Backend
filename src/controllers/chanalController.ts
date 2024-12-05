import { Request, Response } from "express";
import Video from "../models/Video";
import Shorts from "../models/Shorts";
import { log } from "console";

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
  console.log("userID",userId);
  
    if (!userId) {
      throw new Error("Please logIn");
    }
    const videos = await Video.find({ userId });
    console.log("v1", videos);

    res.status(200).json({ videos });
  } catch (error: any) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch videos." });
  }
};

export const getAllShorts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    console.log("shortId", userId);

    if (!userId) {
      throw new Error("please logIn");
    }
    const shorts = await Shorts.find({ userId });
    console.log("sort", shorts);

    res.status(200).json({ shorts });
  } catch (error: any) {
    console.error("Error fetching Shorts:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch Shorts." });
  }
};

export const getEntairVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find(); // Fetch videos
    res.status(200).json({ videos }); // Return as `videos` key
  } catch (error: any) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};


export const getEntairShorts = async (req: Request, res: Response) => {
  try {
    const shorts = await Shorts.find(); // Fetch all shorts from the database
    res.status(200).json({ success: true, shorts });
  } catch (error: any) {
    console.error("Error fetching shorts:", error.message);
    res.status(500).json({ success: false, error: error.message || "Failed to fetch Shorts" });
  }
};


export const getVideoById = async (req: Request, res: Response) => {
  try {
   const{videoId}= req.params;
   console.log('0',videoId);
   
      const video=await Video.findById(videoId)
      res.status(200).json(video );

      
  } catch (error:any) {
    console.error("error fetching One video:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch Shorts" });
  }
};
