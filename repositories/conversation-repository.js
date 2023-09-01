import UserConversationModel from "../models/user-conversation.js";
import { hasValue } from "../common/app-utils.js";
import { NotFoundErr } from "../exceptions/not-found-error.js";
import { AlreadyExsistsError } from "../exceptions/already-exsists-error.js";

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
        { user1: user2, user2: user1 }, // Check both permutations (user1-user2 and user2-user1)
      ],
    });

    if (hasValue(existingConversation)) {
      throw new AlreadyExsistsError("Conversation already exists with the same participants");
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
    }).populate("lastMessage");

    if (!hasValue(conversations) || conversations.length === 0) {
      throw new NotFoundErr("No conversations found for the user");
    }

    return conversations;
  } catch (error) {
    throw error;
  }
};
