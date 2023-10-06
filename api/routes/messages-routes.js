import express from "express";
import {
  send,
  getMessagesByConversationID,
} from "../../controllers/messages-controller.js";

const messagesApi = express.Router();

messagesApi.post("/sendMessage", send);
messagesApi.get("/messages", getMessagesByConversationID);

export default messagesApi;
