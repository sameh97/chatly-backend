import express from "express";
import { createUser, login } from "../../controllers/users-controller.js";

const usersApi = express.Router();

usersApi.post("/createUser", createUser);
usersApi.get("/login", login);
export default usersApi;
