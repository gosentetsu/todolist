import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import Relation from "../../../models/Relation";
import verifyToken from "../../../lib/verifyToken";
/**
 * @swagger
 * /api/tasks/[userId]:
 *   get:
 *     description: Returns task list according to userId
 *     responses:
 *       200:
 *         description: task[]
 *       400:
 *         description: error!
 */
export default async function handler(req, res) {
  const {
    query: { userId },
    method,
    body,
    cookies,
  } = req;
  let result, task, relation, taskId;
  let idLength = 6;
  let idChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  if (!cookies || !cookies.token || userId !== verifyToken(cookies.token)) {
    return res.status(400).json({ message: "please sign in" });
  }
  await dbConnect();

  switch (method) {
    case "GET":
      //获取useId对应的所有taskId
      relation = await Relation.find({ userId: userId });
      //遍历查询Task表得到相应的待办事项
      let tasks = [];
      for (let rel of relation) {
        task = await Task.findOne({ taskId: rel.taskId }).lean();
        delete task._id;
        tasks.push(task);
      }
      res.status(200).json({
        message: "success",
        list: tasks,
      });
      break;
    case "POST":
      while (true) {
        taskId = "T_";
        for (let i = 0; i < idLength; i++) {
          let ind = Math.floor(Math.random() * 62);
          taskId += idChar[ind];
        }
        // taskId查重
        result = await Task.findOne({ taskId: taskId });
        if (!result) break;
      }

      task = {
        taskId: taskId,
        status: false,
        content: body.content,
        comment: body.comment,
        tag: body.tag,
        beginTime: body.beginTime,
        endTime: body.endTime,
      };
      await Task.create(task);

      relation = {
        taskId: taskId,
        userId: userId,
      };
      await Relation.create(relation);

      res.status(200).json({
        message: "success",
        entity: { taskId: taskId },
      });
      break;
    case "PUT":
      if (!body.taskId) {
        return res.status(400).json({ message: "taskId is required" });
      }
      result = await Task.updateOne({ taskId: body.taskId }, { $set: body });
      if (result.modifiedCount !== 1) {
        return res.status(400).json({ message: "update failed" });
      }
      res.status(200).json({ message: "success" });
      break;
    case "DELETE":
      result = await Task.deleteOne({ taskId: body.taskId });
      if (result.deletedCount !== 1) {
        return res.status(400).json({ message: "delete failed" });
      }

      result = await Relation.deleteOne({
        taskId: body.taskId,
        userId: userId,
      });
      if (result.deletedCount !== 1) {
        return res.status(400).json({ message: "delete failed" });
      }

      res.status(200).json({ message: "success" });
      break;
    default:
      res.status(400).json({ message: "null" });
      break;
  }
}
