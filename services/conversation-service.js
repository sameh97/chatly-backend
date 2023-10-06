import { hasValue } from "../common/app-utils.js";
import loggerConfig from "../common/logger-config.js";
import {
  getAllConversationsByUserId,
  save,
  getConversationIfExists,
  update,
} from "../repositories/conversation-repository.js";

export const createConversation = async (conversation) => {
  if (!hasValue(conversation)) {
    throw new Error("Undefined conversation");
  }

  try {
    loggerConfig.info(`Creating conversation: ${JSON.stringify(conversation)}`);
    const createdConversation = await save(conversation);

    loggerConfig.info(
      `conversation was created succsesfully: ${JSON.stringify(
        createdConversation
      )}`
    );

    return createdConversation;
  } catch (error) {
    loggerConfig.error(`Error while creating coversation Error: ${error}`);
    throw error;
  }
};

export const getConversations = async (userId) => {
  if (!hasValue(userId)) {
    throw new Error("Cannot get coversation because userId is undefined");
  }

  try {
    loggerConfig.info(
      `retreving conversations for user with user id: ${userId}`
    );

    const conversations = await getAllConversationsByUserId(userId);
    loggerConfig.info(`conversations retreved successfully`);

    return conversations;
  } catch (error) {
    loggerConfig.error(
      `Error while trying to retreve conversations for user: ${userId} Error: ${error}`
    );
    throw error;
  }
};

export const updateConversation = async (conversationId, newLastMessageId) => {
  if (!hasValue(conversationId) || !hasValue(newLastMessageId)) {
    throw new Error("Conversation ID or updates are undefined");
  }

  try {
    loggerConfig.info(`Updating conversation with ID: ${conversationId}`);

    const updatedConversation = await update(conversationId, newLastMessageId);

    loggerConfig.info(
      `Conversation updated successfully: ${JSON.stringify(
        updatedConversation
      )}`
    );

    return updatedConversation;
  } catch (error) {
    loggerConfig.error(`Error while updating conversation: ${error}`);
    throw error;
  }
};

export const checkIfConversationExists = async (senderId, receiverId) => {
  if (!hasValue(senderId) || !hasValue(receiverId)) {
    throw new Error(
      "Error while checking existance of conversation, senderId or receiverId is not defined"
    );
  }

  try {
    loggerConfig.info("retriving conversation");
    const existingConversation = await getConversationIfExists(
      senderId,
      receiverId
    );

    return existingConversation;
  } catch (error) {
    loggerConfig.error(
      `Error while checking existance of conversation, for users: ${senderId} ,${receiverId} , Error: ${error}`
    );
    throw error;
  }
};
