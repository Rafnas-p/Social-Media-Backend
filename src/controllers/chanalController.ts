import { Request, Response } from "express";
import Video from "../models/Video";
import Shorts from "../models/Shorts";
import Channel from "../models/Channel";
import User from "../models/Users";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadImage } from "../Cloudnary/uploadimag";

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    console.log(req.query);
    
  
    if (!userId) {
      throw new Error("Please logIn");
    }
    const videos = await Video.find({ userId }).populate('userId');
console.log('getAllVideos',getAllVideos);

    res.status(200).json({ videos });
  } catch (error: any) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch videos." });
  }
};


export const getAllShorts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      throw new Error("please logIn");
    }
    const shorts = await Shorts.find({ userId });

    res.status(200).json({ shorts });
  } catch (error: any) {
    console.error("Error fetching Shorts:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch Shorts." });
  }
};

// export const getEntairVideos = async (req: Request, res: Response) => {
//   try {
//     const videos = await Video.find();
//     res.status(200).json({ videos }); 
//   } catch (error: any) {
//     console.error("Error fetching videos:", error.message);
//     res.status(500).json({ error: "Failed to fetch videos" });
//   }
// };
export const getEntairVideos = async (req: Request, res: Response) => {
  try {

    const videos = await Video.find().populate("userId")

   
    
    res.status(200).json({ videos });
  } catch (error: any) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};




export const getEntairShorts = async (req: Request, res: Response) => {
  try {
    const shorts = await Shorts.find(); 
    res.status(200).json({ success: true, shorts });
  } catch (error: any) {
    console.error("Error fetching shorts:", error.message);
    res.status(500).json({ success: false, error: error.message || "Failed to fetch Shorts" });
  }
};


export const getVideoById = async (req: Request, res: Response) => {
  try {
    
   const{videoId}= req.params;

   
   
      const video=await Video.findById(videoId).populate("userId").populate("channelId")
      res.status(200).json(video );

      
  } catch (error:any) {
    console.error("error fetching One video:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch Shorts" });
  }
};

export const getShortsById = async (req: Request, res: Response) => {
  try {
    const { shortsId } = req.params;

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
    const { videoId } = req.params; 
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { title, description },
      { new: true }
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
    const { title, description } = req.body; 
    const { shortsId } = req.params; 

    const updatedShorts = await Shorts.findByIdAndUpdate(
      shortsId,
      { title, description },
      { new: true } 
    );

    if (!updatedShorts) {
       res.status(404).json({ message: "Shorts not found" });
    }

    res.json(updatedShorts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../profile/images');
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
export const imageUpload = upload.single('image');

export const createChannel = async (req: Request, res: Response): Promise<void> => {
  const { name, userId, handil,photoURL } = req.body;

  
  if (!name || ! userId) {
    res.status(400).json({ message: 'Name and ownerId are required.' });
    return;
  }
const _id=userId;
  try {
    const owner = await User.findOne({ _id });
    if (!owner) {
      res.status(404).json({ message: 'Owner not found.' });
      return;
    }

    const existingChannel = await Channel.findOne({ name, userId: userId });
    if (existingChannel) {
      res.status(400).json({ message: 'Channel with the same name already exists.' });
      return;
    }

    let profile=photoURL;

    if (req.file) {
      const filePath = req.file.path;
      const uploadResult = await uploadImage(filePath);
      profile = uploadResult.secure_url;
      fs.unlinkSync(filePath); // Delete local file after upload
    }

    const channel = new Channel({
      name,
      userId: userId,
      profile,
      handil,
    });

    await channel.save();

    res.status(201).json({
      message: 'Channel created successfully!',
      channel,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const getChannels = async (req: Request, res: Response): Promise<void> => {
  const { ownerId } = req.query;

  if (!ownerId) {
    res.status(400).json({ message: 'ownerId is required.' });
    return;
  }

  try {
    const channels = await Channel.findOne({ userId: ownerId });
    if (!channels) {
      res.status(404).json({ message: 'No channels found for this user.' });
      return;
    }

    res.status(200).json(channels);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};


export const getChannelsByName= async (req: Request, res: Response): Promise<void> => {
  const { userName } = req.query;

  if (!userName) {
    res.status(400).json({ message: 'ownerId is required.' });
    return;
  }
  

  try {
    const channels = await Channel.find({ name: userName });
    console.log('channels',channels);
    
    if (!channels) {
      res.status(404).json({ message: 'No channels found for this user.' });
      return;
    }

    res.status(200).json(channels);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

