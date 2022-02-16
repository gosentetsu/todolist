import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import User from "../../../models/User";
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
    method
  } = req;
  let result, task;

  await dbConnect();

  //获取useId对应的所有taskId
  const user = await User.findOne({userId: userId});
  if (!user) {
    return res.status(400).json({ message: "null"});
  }
  let taskIds = user.taskIds;

  switch (method) {
    case "GET":
      //遍历查询Task表得到相应的待办事项
      let tasks = [];
      for(let taskId of taskIds){
        task = await Task.findOne({taskId: taskId}).lean();
        delete task._id;
        tasks.push(task);
      }
      res.status(200).json({ 
        message: "success",
        list: tasks
      });
      break;
    case "POST":
      let idLength = 6;
      let idChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let taskId = "T_";
      for(let i = 0; i < idLength; i++){
          let ind = Math.floor(Math.random()*62);
          taskId += idChar[ind];
      }
      
      task = {
        taskId: taskId,
        userIds: [userId],
        status: "not complete",
        content: req.body.content,
        comment: req.body.comment,
        tag: req.body.tag,
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
      };
      await Task.create(task);

      taskIds.push(taskId);
      result = await User.updateOne({userId: userId}, {$set: {taskIds: taskIds}})
      if(result.modifiedCount !== 1){
        return res.status(400).json({ message: "addition failed"});
      }
      
      res.status(200).json({ 
        message: "success",
        entity: {taskId: taskId}
      });
      break;
    case "DELETE":
      result = await Task.deleteOne({taskId: req.body.taskId});
      if(result.deletedCount !== 1){
        return res.status(400).json({ message: "delete failed"});
      }

      taskIds.map((val, ind) => {
        if(val == req.body.taskId){
          taskIds.splice(ind, 1);
        }
      });
      result = await User.updateOne({userId: userId}, {$set: {taskIds: taskIds}})
      if(result.modifiedCount !== 1){
        return res.status(400).json({ message: "update failed"});
      }
      res.status(200).json({ message: "success"});
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
