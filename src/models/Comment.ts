const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userProfile: { type: String, required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the reply
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who disliked the reply
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } // Replies are embedded and don't need separate _id
);

const commentSchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, // ID of the video or post
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userProfile: { type: String, required: true },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the comment
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who disliked the comment
    replies: [replySchema], // Array of replies
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comment", commentSchema);

export default Comments;
