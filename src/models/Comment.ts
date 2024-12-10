const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userProfile: { type: String, required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } 
);

const commentSchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, 
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userProfile: { type: String, required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    replies: [replySchema], 
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comment", commentSchema);

export default Comments;
