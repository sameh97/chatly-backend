import express from "express";
import { send } from "../../controllers/messages-controller.js";

const messagesApi = express.Router();

messagesApi.post("send", send);

export default messagesApi;
