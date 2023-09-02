import mongoose from "mongoose";

const userConversationSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Messages" },
});

const UserConversationModel = mongoose.model(
  "UserConversation",
  userConversationSchema
);

export default UserConversationModel;
