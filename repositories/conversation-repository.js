import UserConversationModel from "../models/user-conversation.js";
import { hasValue } from "../common/app-utils.js";
import { NotFoundErr } from "../exceptions/not-found-error.js";
import { AlreadyExistsError } from "../exceptions/already-exsists-error.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";

export const save = async (conversation) => {
  try {
    if (!hasValue(conversation)) {
      throw new Error("Cannot create conversation because it's undefined");
    }

    const { user1, user2, lastMessage } = conversation;

    // Check if a conversation with the same participants already exists.
    const existingConversation = await UserConversationModel.findOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 }, 
      ],
    });

    if (hasValue(existingConversation)) {
      throw new AlreadyExistsError(
        "Conversation already exists with the same participants"
      );
    }

    const newConversation = new UserConversationModel({
      user1: user1,
      user2: user2,
      lastMessage: lastMessage,
    });

    await newConversation.save();

    return newConversation;
  } catch (error) {
    throw error;
  }
};

export const getAllConversationsByUserId = async (userId) => {
  try {
    const conversations = await UserConversationModel.find({
      $or: [{ user1: userId }, { user2: userId }],
    }).populate([
      { path: "user1", model: UserModel },
      { path: "user2", model: UserModel },
      { path: "lastMessage" }, // Assuming this is a valid reference without specifying a model
    ]);

    if (!hasValue(conversations) || conversations.length === 0) {
      throw new NotFoundErr("No conversations found for the user");
    }

    return conversations;
  } catch (error) {
    throw error;
  }
};

export const getConversationIfExists = async (senderId, receiverId) => {
  try {
    const existingConversation = await UserConversationModel.findOne({
      $or: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId },
      ],
    });

    return existingConversation;
  } catch (error) {
    throw error;
  }
};

export const update = async (conversationId, newLastMessage) => {
  try {
    if (!hasValue(conversationId) || !hasValue(newLastMessage)) {
      throw new Error("Conversation ID or newLastMessage are undefined");
    }

    // Find the conversation by ID
    const conversation = await UserConversationModel.findById(conversationId);

    if (!conversation) {
      throw new NotFoundErr(
        `Conversation not found with ID: ${conversationId}`
      );
    }

    // Update the lastMessage property
    conversation.lastMessage = newLastMessage;

    // Save the updated conversation
    const updatedConversation = await conversation.save();

    return updatedConversation;
  } catch (error) {
    throw error;
  }
};
