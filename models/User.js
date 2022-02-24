import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  password: String,
  slogan: String,
  picUrl: String
}, {
  versionKey: false
});

export default mongoose.model("User", UserSchema);
