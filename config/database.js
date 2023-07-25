import mongoose from "mongoose";
import { hasValue } from "../common/app-utils.js";

let connection;

const dbConnect = async (mongoUri) => {
  try {
    if (hasValue(connection)) {
      return connection;
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected");

    connection = mongoose.connection;
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default dbConnect; // Export the dbConnect function
