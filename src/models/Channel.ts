import mongoose, { Schema, Document, Types } from 'mongoose';

interface ChannelDocument extends Document {
  name: string;
  uid:string;
  subscribers: Types.ObjectId[];
  totalSubscribers: number;
  profile:string
  handil:string
}

const ChannelSchema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, ref: 'User', required: true }, 
  subscribers: [{ type: String }],
  profile: { type: String },
  handil: { type: String },
  totalSubscribers: { type: Number, default: 0 },
});

const Channel = mongoose.model<ChannelDocument>('Channel', ChannelSchema);

export default Channel
