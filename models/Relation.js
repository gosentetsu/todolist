import mongoose from "mongoose";

const RelationSchema = new mongoose.Schema({
  userId: String,
  taskId: String
}, {
  versionKey: false
});

export default mongoose.model("Relation", RelationSchema);
