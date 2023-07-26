import express from "express";
import { createUser } from "../../controllers/users-controller.js";

const usersApi = express.Router();

usersApi.post("/createUser", createUser);

export default usersApi;
