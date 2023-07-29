import { hasValue } from "../common/app-utils.js";
import { AlreadyExsistsError } from "../exceptions/already-exsists-error.js";
import { NotFoundErr } from "../exceptions/not-found-error.js";
import UserModel from "../models/user.js";

export const save = async (user) => {
  if (!hasValue(user) || !hasValue(user.email)) {
    throw new Error("User is undefined or lacks of credentials");
  }

  const userInDB = await UserModel.findOne({ email: user.email });

  if (hasValue(userInDB && hasValue(userInDB.email))) {
    throw new AlreadyExsistsError(
      `User with email: ${user.email} already exsist`
    );
  }

  const createdUser = await UserModel.create(user);

  return createdUser;
};

export const getByEmail = async (email) => {
  if (!hasValue(email)) {
    throw new Error("Cannot get user, email is null or undefined");
  }

  const userInDB = await UserModel.findOne({ email: email });
  if (!hasValue(userInDB)) {
    throw new NotFoundErr(`User with mail ${email} does not exist`);
  }

  return userInDB;
};
