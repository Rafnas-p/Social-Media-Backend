import { Request, Response } from "express";
import User from "../models/Users"
import Channel from "../models/Channel";

export const CreatUser = async (req:Request, res:Response) => {

  const { uid, email, displayName, photoURL, channelName } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, email, displayName, photoURL, channelName });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error:any) {
    console.error("Error saving user:", error.message); // Log error message
    console.error("Stack trace:", error.stack); // Log error stack trace
    res.status(500).json({ success: false, message: "Error saving user", error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    // Find the user by their ID (uid)
    const user = await User.findOne({uid});

    // If the user is not found, return a 404 response
    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
    }

    // Return the user data
    res.status(200).json(user);
  } catch (error: any) {
    // Handle any errors that occur
    console.error("Error fetching user by ID:", error.message);
    res.status(500).json({ message: "Internal server error" });
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

   
    export const subscriberChannel = async (req: Request, res: Response) => {
      const { uid, channelId } = req.body;
    
    
      const _id = channelId;
    
      if (!_id || !uid) {
        res.status(400).json({ message: 'Channel ID and User ID are required' });
        return;
      }
    
      try {
        const channel = await Channel.findOne({ _id });
        const user = await User.findOne({ uid });
    
        if (!channel) {
          res.status(404).json({ message: 'Channel not found' });
          return;
        }
    
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
    
        const isSubscribed = channel.subscribers.includes(uid);
    
        if (isSubscribed) {
          // Unsubscribe the user
          channel.subscribers = channel.subscribers.filter(subscriberId => subscriberId !== uid);
          channel.totalSubscribers -= 1;
          await channel.save();
    
          res.status(200).json({
            message: 'Unsubscribed successfully',
            subscribers: channel.subscribers.length,
          });
        } else {
          // Subscribe the user
          channel.subscribers.push(uid);
          channel.totalSubscribers += 1;
          await channel.save();
    
          res.status(200).json({
            message: 'Subscription successful',
            subscribers: channel.subscribers.length,
          });
        }
    
      } catch (error: any) {
        console.error('Error in subscription/unsubscription:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    };
    
   
    export const getSubscribersCount = async (req: Request, res: Response) => {
      const { channelId } = req.body;
    
      if (!channelId) {
        res.status(400).json({ message: 'Channel ID is required' });
        return;
      }
    
      try {
        const channel = await Channel.findOne({ _id: channelId }).select('subscribers');
    
        if (!channel) {
          res.status(404).json({ message: 'Channel not found' });
          return;
        }
    
        res.status(200).json({ subscribersCount: channel.subscribers.length });
      } catch (error: any) {
        console.error('Error fetching subscribers count:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    };
    