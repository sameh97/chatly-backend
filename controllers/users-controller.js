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
