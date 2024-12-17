import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  description: string;
  videoUrl: string;
  publicId: string;
  createdAt: Date;
  uid: string;
  duration: number;
  title: string | number;
  profil: string;
  userName: string;
  likes: string[]; // Updated to an array of strings
  dislikes: mongoose.Types.ObjectId[]; // Updated to match the schema
  channelId: mongoose.Types.ObjectId; // Add channelId to the interface
}

const videoSchema: Schema = new Schema<IVideo>({
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  uid: { type: String, ref: 'User', required: true },
  profil: { type: String },
  likes: [{ type: String }], // Updated to an array of strings
  dislikes: [{ type: mongoose.Schema.Types.ObjectId }], // Correct type for ObjectId
  userName: { type: String },
  duration: { type: Number, required: true },
  title: { type: String, required: true },
  channelId: { type: mongoose.Schema.Types.ObjectId }, // Define channelId in the schema
});

const Video = mongoose.model<IVideo>("Video", videoSchema);
export default Video;
