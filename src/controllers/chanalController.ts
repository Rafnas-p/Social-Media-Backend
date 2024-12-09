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
   
      const video=await Video.findById(videoId)
      res.status(200).json(video );

      
  } catch (error:any) {
    console.error("error fetching One video:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch Shorts" });
  }
};

export const getShortsById = async (req: Request, res: Response) => {
  try {
    const { shortsId } = req.params;

    // Fetch the Shorts video by its ID
    const shorts = await Shorts.findById(shortsId);

    if (!shorts) {
       res.status(404).json({ message: "Shorts not found" });
    }

    res.status(200).json(shorts);
  } catch (error: any) {
    console.error("Error fetching Shorts video:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch Shorts video" });
  }
};

export const UpdateVideoByID = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { videoId } = req.params; // Correct parameter name
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { title, description },
      { new: true } // Return the updated document
    );
    if (!updatedVideo) {
    res.status(404).json({ message: "Video not found" });
    }
    res.json(updatedVideo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const UpdateShortsByID = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body; // Extract fields from the request body
    const { shortsId } = req.params; // Extract the shorts ID from the request parameters

    const updatedShorts = await Shorts.findByIdAndUpdate(
      shortsId,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedShorts) {
       res.status(404).json({ message: "Shorts not found" });
    }

    res.json(updatedShorts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};