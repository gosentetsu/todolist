import mongoose from "mongoose";

const RelationSchema = new mongoose.Schema(
  {
    userId: String,
    taskId: String,
  },
  {
    versionKey: false,
  }
);

<<<<<<< HEAD
export default mongoose.models.Relation ||
  mongoose.model("Relation", RelationSchema);
=======
export default mongoose.models.Relation ||  mongoose.model("Relation", RelationSchema);
>>>>>>> 7b5c32d974fd458c3ba4ea707e991e74f8f0ecea
