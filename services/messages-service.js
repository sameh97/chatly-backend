import { hasValue } from "../common/app-utils.js";
import loggerConfig from "../common/logger-config.js";
import { createMessage } from "../repositories/messages-repository.js";

export const sendMessage = async (message) => {
  if (!hasValue(message)) {
    throw new Error("Cannot send message because its undefined");
  }

  try {
    loggerConfig.info(
      `Creating message: ${JSON.stringify(message)} in database `
    );

    const createdMessage = await createMessage(message);
    loggerConfig.info(`Message created successfully`);

    // TODO: perform the send logic

    return createdMessage;
  } catch (error) {
    loggerConfig.error(`Error while sending message: ${error}`);
    console.log("Error while sending message: ", error);
    throw error;
  }
};

