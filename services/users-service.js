import { save } from "../repositories/users-repository.js";

export const createUser = async (user) => {
  // TODO: create transaction
  try {
    const createdUser = await save(user);

    //TODO: add logs

    return createdUser;
  } catch (error) {
    //TODO: add logs
    throw new Error(error.message);
  }
};
