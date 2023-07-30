import loggerConfig from "../common/logger-config.js";
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

    loggerConfig.info(`User with email ${email} logged in successfully.`);

    res.status(200).send(token);
  } catch (error) {
    loggerConfig.error(`Error occured during login: ${error.message}`);
    next(error);
  }
};
