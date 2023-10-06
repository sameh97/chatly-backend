import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserConversation",
    required: true,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model("Messages", messageSchema);

export default MessageModel;
