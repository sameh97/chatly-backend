import { hasValue } from "../common/app-utils.js";
import { AlreadyExsistsError } from "../exceptions/already-exsists-error.js";
import UserModel from "../models/user.js";

export const save = async (user) => {
  if (!hasValue(user) || !hasValue(user.email)) {
    throw new Error("User is undefined or lacks of credentials");
  }

  const userInDB = await UserModel.find({ email: user.email });

  if (hasValue(userInDB[0] && hasValue(userInDB[0].email))) {
    throw new AlreadyExsistsError(
      `User with email: ${user.email} already exsist`
    );
  }

  const createdUser = await UserModel.create(user);

  return createdUser;
};
