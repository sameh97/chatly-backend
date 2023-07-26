import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // Corrected field name from "passwotd" to "password"
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
