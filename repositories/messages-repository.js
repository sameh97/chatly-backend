import { hasValue } from "../common/app-utils.js";
import MessageModel from "../models/message.js";

export const createMessage = async (message) => {
  if (!hasValue(message.senderId) || !hasValue(message.receiverId)) {
    throw new Error(
      "Error while creating message, senderId or receiverId is not defined"
    );
  } else if (!hasValue(message.content)) {
    throw new Error("Error while creating message, content is not defined");
  }

  const newMessage = new MessageModel({
    senderId: message.senderId,
    receiverId: message.receiverId,
    content: message.content,
  });

  await newMessage.save();

  return newMessage;
};
