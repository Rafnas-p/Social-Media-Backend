
import mongoose, { Document, Schema } from 'mongoose';

export interface IShorts extends Document {
  description: string;
  videoUrl: string;
  publicId: string;
  createdAt: Date;
  userId: string; 
  duration: number;
  title: string | number;
  category: string; 
  isShort: boolean;
  profil:string
  userName:string
}

const shortsSchema: Schema = new Schema<IShorts>({
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }, 
  profil: { type: String }, 
  userName:{type:String},

  duration: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Shorts' }, 
  isShort: { type: Boolean, default: true }, 
});

const Shorts = mongoose.model<IShorts>('Shorts', shortsSchema);

export default Shorts;
