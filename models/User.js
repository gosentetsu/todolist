import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

export default mongoose.models.User || mongoose.model("User", PetSchema);
