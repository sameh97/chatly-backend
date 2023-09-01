import {
  createConversation,
  getConversations,
} from "../services/conversation-service.js";

export const create = async (req, res, next) => {
  const conversation = req.body;

  try {
    const createdConversation = await createConversation(conversation);
    res.status(201).send(createdConversation);
  } catch (error) {
    console.error("Error while creating conversation:", error.message);
    next(error);
  }
};

export const getByUserId = async (req, res, next) => {
  const userId = req.query.userId;
  
  try {
    const conversations = await getConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error while retreving conversations:", error.message);
    next(error);
  }
};
