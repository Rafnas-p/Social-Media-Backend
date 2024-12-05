
import mongoose, { Document, Schema } from 'mongoose';

export interface IShorts extends Document {
  description: string;
  videoUrl: string;
  publicId: string;
  createdAt: Date;
  userId: string; 
  duration: number;
  title: string | number;
  category: string; // e.g., 'Shorts' or other categories if needed
  isShort: boolean; // A flag to mark whether it's a short video
  profil:string
  userName:string
}

const shortsSchema: Schema = new Schema<IShorts>({
  description: { type: String, required: true }, // Ensure description is required
  videoUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }, // Reference to User
  profil: { type: String }, // Optional
  userName:{type:String},

  duration: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Shorts' }, // Mark this as a 'Shorts' category
  isShort: { type: Boolean, default: true }, // Always true for Shorts videos
});

// You can choose whether you want to keep Shorts as a separate model or use the same model as for regular videos
const Shorts = mongoose.model<IShorts>('Shorts', shortsSchema);

export default Shorts;
