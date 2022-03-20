import mongoose from "mongoose";

const RelationSchema = new mongoose.Schema(
  {
    userId: String,
    taskId: String,
    acknowledge: Boolean
  },{
    versionKey: false,
  }
);

export default mongoose.models.Relation || mongoose.model("Relation", RelationSchema);
