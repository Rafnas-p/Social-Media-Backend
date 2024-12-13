import mongoose, { Schema, Document, Types } from 'mongoose';

interface ChannelDocument extends Document {
  name: string;
  channelId: Types.ObjectId;
  subscribers: Types.ObjectId[];
  totalSubscribers: number;
}

const ChannelSchema = new Schema<ChannelDocument>({
  name: { type: String, required: true },
  channelId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subscribers: [{ type: String }], // Store user IDs as strings
  totalSubscribers: { type: Number, default: 0 },
});

const Channel = mongoose.model<ChannelDocument>('Channel', ChannelSchema);

export default Channel
