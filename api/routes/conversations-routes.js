import express from "express";
import {
  create,
  getByUserId,
} from "../../controllers/conversations-controller.js";

const conversationsApi = express.Router();

conversationsApi.post("/createConversation", create);
conversationsApi.get("/getConversations", getByUserId);

export default conversationsApi;
