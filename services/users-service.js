import jsonwebtoken from "jsonwebtoken";
import { hasValue } from "../common/app-utils.js";
import { AuthenticationError } from "../exceptions/authentication-error.js";
import { getByEmail, save } from "../repositories/users-repository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { startTransaction } from "../common/transaction-utils.js";
import loggerConfig from "../common/logger-config.js";
dotenv.config();

export const createUser = async (user) => {
  if (!hasValue(user)) {
    throw new Error("User is not defined");
  }
  const session = await startTransaction();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userWithHashedPassword = { ...user, password: hashedPassword };

    loggerConfig.info(`Creating user: ${user.email}`);

    const createdUser = await save(userWithHashedPassword);

    loggerConfig.info("User created successfully", { user: createdUser });

    session.commitTransaction();

    session.endSession();

    return createdUser;
  } catch (error) {
    loggerConfig.error("Error while creating user.", { error });

    session.abortTransaction();

    session.endSession();

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
