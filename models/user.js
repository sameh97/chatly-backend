import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwotd: { type: String, required: true },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
