import mongoose from "mongoose";

<<<<<<< HEAD
const TaskSchema = new mongoose.Schema(
  {
    taskId: String,
    content: String,
    comment: String,
    tag: String,
    status: Boolean,
    beginTime: Date,
    endTime: Date,
  },
  {
    versionKey: false,
  }
);
=======
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
>>>>>>> ccfc5b80b94813a9925b341b0b404a527dd29f13

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
