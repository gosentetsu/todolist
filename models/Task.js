import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskId: String,
  adminId: String,
  content: String,
  importance: Number,
  tag: String,
  status: Boolean,
  beginTime: Number,
  endTime: Number
}, {
  versionKey: false
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
