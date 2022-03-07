import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskId: String,
  content: String,
  importance: Number,
  tag: String,
  status: Boolean,
  beginTime: Date,
  endTime: Date
}, {
  versionKey: false
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
