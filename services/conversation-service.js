import { hasValue } from "../common/app-utils.js";
import loggerConfig from "../common/logger-config.js";
import {
  getAllConversationsByUserId,
  save,
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
