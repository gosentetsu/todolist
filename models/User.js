import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
