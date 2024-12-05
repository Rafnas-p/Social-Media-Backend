import { Request, Response } from "express";
import User from "../models/Users"

export  const CreatUser=async(req:Request,res:Response)=>{
    
    const { uid, email, displayName, photoURL, channelName } = req.body;
    try {
        let user = await User.findOne({ uid });
        if (!user) {
          user = new User({ uid, email, displayName, photoURL, channelName });
          await user.save();
        }
        res.status(200).json( user );
      } catch (error) {
        res.status(500).json({ success: false, message: "Error saving user", error });
      }
    };

    
    export const getAllUsers = async (req: Request, res: Response) => {
      try {
        const users = await User.find(); 
        res.status(200).json(users); 
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Failed to fetch users" });
      }
    };
    
    
