import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskId: String,
  content: String,
  comment: String,
  tag: String,
  status: String,
  beginTime: Date,
  endTime: Date
}, {
  versionKey: false
});

export default mongoose.model("Task", TaskSchema);
