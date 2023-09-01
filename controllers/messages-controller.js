import loggerConfig from "../common/logger-config.js";
import { sendMessage } from "../services/messages-service.js";

export const send = async (req, res, next) => {
  const message = req.body;

  try {
    const sentMessage = await sendMessage(message);
    loggerConfig.info("Message sent successfully");
    
    res.status(201).send(sentMessage);
  } catch (error) {
    console.log(`Error while sending message, Error: ${error.message}`);
    console.log(`Full exception: ${error}`);
    loggerConfig.error(`Error while sending message, Error: ${error.message}`);
    loggerConfig.error(`Full exception: ${error}`);
    next(error);
  }
};
