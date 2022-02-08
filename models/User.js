import mongoose from "mongoose";
import { ST } from "next/dist/shared/lib/utils";

const UserSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  password: String,
  slogan: String,
  picUrl: String,
  taskIds: []
});

export default mongoose.model("User", UserSchema);
