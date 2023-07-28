import { AuthenticationError } from "../exceptions/authentication-error.js";
import * as usersService from "./../services/users-service.js";

export const createUser = async (req, res, next) => {
  const userToCreate = req.body;
  try {
    //TODO: add logs
    const createdUser = await usersService.createUser(userToCreate);

    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await usersService.login(email, password);
    //TODO: add logs
    res.status(200).send(token);
  } catch (error) {
    //TODO: add logs
    next(error);
  }
};
