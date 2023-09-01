import express from "express";
import { send } from "../../controllers/messages-controller.js";

const messagesApi = express.Router();

messagesApi.post("/sendMessage", send);

export default messagesApi;
