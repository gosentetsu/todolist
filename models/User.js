import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    password: String,
    slogan: String,
    picUrl: String,
  },
  {
    versionKey: false,
  }
);

<<<<<<< HEAD
export default mongoose.models.User || mongoose.model("User", UserSchema);
=======
export default mongoose.models.User ||  mongoose.model("User", UserSchema);
>>>>>>> 7b5c32d974fd458c3ba4ea707e991e74f8f0ecea
