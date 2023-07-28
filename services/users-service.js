import jsonwebtoken from "jsonwebtoken";
import { hasValue } from "../common/app-utils.js";
import { AuthenticationError } from "../exceptions/authentication-error.js";
import { getByEmail, save } from "../repositories/users-repository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (user) => {
  if (!hasValue(user)) {
    throw new Error("User is not defined");
  }
  // TODO: create transaction
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userWithHashedPassword = { ...user, password: hashedPassword };

    const createdUser = await save(userWithHashedPassword);

    //TODO: add logs

    return createdUser;
  } catch (error) {
    //TODO: add logs
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  const userInDB = await getByEmail(email);

  const isPasswordOk = await bcrypt.compare(password, userInDB.password);

  if (!isPasswordOk) {
    throw new AuthenticationError(
      `User with email: ${email} is not authenticated`
    );
  }

  const userPayload = userInDB.toObject();

  const token = await jsonwebtoken.sign(
    userPayload,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return token;
};
