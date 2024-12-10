import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  description: string;
  videoUrl: string;
  publicId: string;
  createdAt: Date;
  userId: string; 
  duration:number
  title:string | number
 profil:string;
 userName:string
}

const videoSchema: Schema = new Schema<IVideo>({
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }, 
  profil: { type: String }, 
  userName:{type:String},
  duration:{type:Number, required: true },
  title:{type:String,required:true},
  
});

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;
