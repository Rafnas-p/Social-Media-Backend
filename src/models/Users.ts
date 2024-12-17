const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  channelName:{type: String},
  photoURL: { type: String },
  subscribedChannels: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }, 
  ],
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);

export default User
