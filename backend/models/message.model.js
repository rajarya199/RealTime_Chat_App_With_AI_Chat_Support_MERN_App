import mongoose from "mongoose";
const aiResponseSchema = new mongoose.Schema({
  text: String,
  fileTree: { type: Object, default: null },
  buildCommand: { type: Object, default: null },
  startCommand: { type: Object, default: null },
}, { _id: false });
const senderSchema = new mongoose.Schema({
  id: {
    type: String, // For users: user._id as string; for AI: fixed string like "ai"
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
}, { _id: false });

const messageSchema = new mongoose.Schema({
    sender:{
    type: senderSchema,
    required: true,
    },
      project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
   text: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: aiResponseSchema,
    default: null,
  },
},{ timestamps: true })
const Message = mongoose.model("message", messageSchema);

export default Message;
