import mongoose from "mongoose";
import { ST } from "next/dist/shared/lib/utils";

const TaskSchema = new mongoose.Schema({
  taskId: String,
  content: String,
  comment: String,
  tag: String,
  status: String,
  beginTime: Date,
  endTime: Date,
  userIds: []
});

export default mongoose.model("Task", TaskSchema);
