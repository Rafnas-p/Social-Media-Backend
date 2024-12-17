import { Request, Response } from "express";
import User from "../models/Users"
import Channel from "../models/Channel";

export const CreatUser = async (req:Request, res:Response) => {
  console.log("Received request body:", req.body);

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
      
      
    const _id=channelId
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
    
        if (channel.subscribers.includes(uid)) {
          res.status(400).json({ message: 'User already subscribed to this channel' });
          return;
        }
    
        channel.subscribers.push(uid);
        channel.totalSubscribers += 1;
        await channel.save();
        console.log('channel.subscribers',channel);

        res.status(200).json({
          message: 'Subscription successful',
          totalSubscribers: channel.totalSubscribers,
          subscribers:channel.subscribers
        });
      } catch (error: any) {
        console.error('Error in subscription:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    };

    export const unSubscribeChannel = async (req: Request, res: Response) => {
      const { uid, channelId } = req.body;
  
      if (!channelId || !uid) {
          res.status(400).json({ message: 'Channel ID and User ID are required' });
          return; 
      }
  
      try {
          const channel = await Channel.findOne({ channelId });
          const user = await User.findOne({ uid });
  
          if (!channel) {
              res.status(404).json({ message: 'Channel not found' });
              return;
          }
  
          if (!user) {
              res.status(404).json({ message: 'User not found' });
              return;
          }
  
          if (!channel.subscribers.includes(uid)) {
              res.status(400).json({ message: 'User is not subscribed to this channel' });
              return;
          }
  
          channel.subscribers = channel.subscribers.filter((subscriber) => subscriber !== uid);
          channel.totalSubscribers = Math.max(0, channel.totalSubscribers - 1); 
          await channel.save();
  
          res.status(200).json({
              message: 'Unsubscription successful',
              totalSubscribers: channel.totalSubscribers,
          });
      } catch (error: any) {
          console.error('Error in unsubscription:', error);
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  };
  