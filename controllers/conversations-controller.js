import {
  createConversation,
  getConversations,
} from "../services/conversation-service.js";

export const create = async (req, res, next) => {
  const conversation = req.body.conversation;

  try {
    const createdConversation = await createConversation(conversation);
    res.status(201).send(createdConversation);
  } catch (error) {
    console.error("Error while creating conversation:", error.message);
    next(error);
  }
};

export const getByUserId = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const conversations = await getConversations(userId);
    return conversations;
  } catch (error) {
    console.error("Error while retreving conversations:", error.message);
    next(error);
  }
};
