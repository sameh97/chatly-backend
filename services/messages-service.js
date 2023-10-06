import mongoose from "mongoose";
import { hasValue } from "../common/app-utils.js";
import loggerConfig from "../common/logger-config.js";
import {
  createMessage,
  getAllMessagesByConversationId,
} from "../repositories/messages-repository.js";
import {
  checkIfConversationExists,
  createConversation,
  updateConversation,
} from "./conversation-service.js";

export const sendMessage = async (message) => {
  if (!hasValue(message)) {
    throw new Error("Cannot send message because its undefined");
  }

  try {
    loggerConfig.info(
      `Creating message: ${JSON.stringify(message)} in database `
    );
    const existingConversation = await checkIfConversationExists(
      message.senderId,
      message.receiverId
    );
    console.log(existingConversation);
    if (!hasValue(existingConversation)) {
      const newConversationObject = {
        user1: message.senderId,
        user2: message.receiverId,
        lastMessage: message.content,
      };
      // If no conversation exists, create a new one
      const newConversation = await createConversation(newConversationObject);

      loggerConfig.info(
        `New conversation created successfully: ${newConversation._id}`
      );

      // Use the newly created conversation to send the message
      message.conversationId = newConversation._id;
    } else {
      // Use the existing conversation to send the message
      message.conversationId = existingConversation._id;
    }

    const createdMessage = await createMessage(message);
    loggerConfig.info(`Message created successfully`);

    loggerConfig.info(`Updateding last message`);
    await updateConversation(message.conversationId, createdMessage._id);
    loggerConfig.info(`Updated last message successfully.`);
    // TODO: perform the send logic

    return createdMessage;
  } catch (error) {
    loggerConfig.error(`Error while sending message: ${error}`);
    console.log("Error while sending message: ", error);
    throw error;
  }
};

export const getMessagesByConversationId = async (conversationId) => {
  if (!hasValue(conversationId)) {
    throw new Error(
      "Cannot retrive all messages because conversationId is undefined"
    );
  }

  try {
    loggerConfig.info(
      `Retriving all messages for conversationId: ${conversationId}`
    );

    const messages = await getAllMessagesByConversationId(conversationId);

    loggerConfig.info(`messages retrevied successfully`);

    return messages;
  } catch (error) {
    loggerConfig.error(`Error while retriving all messages: ${error}`);
    console.log("Error while retriving all messages: ", error);
    throw error;
  }
};
