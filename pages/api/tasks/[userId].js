import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import User from "../../../models/User";
import Relation from "../../../models/Relation";
import verifyToken from "../../../lib/verifyToken";
import checkAttr from "../../../lib/checkAttributes";

export default async function handler(req, res) {
  const {
    query: { userId },
    method,
    body,
    cookies
  } = req;
  let result, task, relation, taskId, check_result;
  let idLength = 6;
  let idChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  if(!cookies || !cookies.token || userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }
  await dbConnect();

  switch (method) {
    case "GET":
      //获取useId对应的所有taskId
      relation = await Relation.find({userId: userId});
      //遍历查询Task表得到相应的待办事项
      let tasks = [];
      let users = [];
      for(let rel of relation){
        task = await Task.findOne({taskId: rel.taskId}).lean();
        let relations = await Relation.find({taskId: rel.taskId}).lean();
        let coworkers = [];
        for(let r of relations){
          let username = users[r.userId];
          if(!username){ // username不在数组里，查数据库，并把结果保存进数组
            let user = await User.findOne({userId: r.userId});
            username = user.userName;
            users[r.userId] = username;
          }
          coworkers.push({
            userId: r.userId,
            acknowledge: r.acknowledge,
            userName: username
          });
        }
        task.coworkers = coworkers;
        delete task._id;
        tasks.push(task);
      }
      res.status(200).json({ 
        message: "success",
        list: tasks
      });
      break;
    case "POST":
      check_result = checkAttr(body, ["content", "importance", "tag", "beginTime", "endTime"], true);
      if(!check_result){
        return res.status(200).json({ message: "wrong attributes"});
      }
      
      while(true){
        taskId = "T_";
        for(let i = 0; i < idLength; i++){
          let ind = Math.floor(Math.random()*62);
          taskId += idChar[ind];
        }
        
        // taskId查重
        result = await Task.findOne({taskId: taskId});
        if(!result) break;
      }
      
      task = {
        taskId: taskId,
        adminId: userId,
        status: false,
        content: body.content,
        importance: body.importance,
        tag: body.tag,
        beginTime: body.beginTime,
        endTime: body.endTime,
      };
      await Task.create(task);

      relation = {
        taskId: taskId,
        userId: userId,
        acknowledge: true
      };
      await Relation.create(relation);
      
      res.status(200).json({ 
        message: "success",
        entity: {taskId: taskId}
      });
      break;
    case "PUT":
      check_result = checkAttr(body, ["taskId", "content", "importance", "tag", "status", "beginTime", "endTime"], false);
      if(!check_result){
        return res.status(200).json({ message: "wrong attributes"});
      }
      
      if(!body.taskId){
        return res.status(200).json({ message: "taskId is required"});
      }

      result = await Task.findOne({
        taskId: body.taskId,
        adminId: userId
      });
      if(!result){
        return res.status(200).json({ message: "you don't have permission"});
      }

      result = await Task.updateOne({taskId: body.taskId}, {$set: body});
      if(result.modifiedCount !== 1){
        return res.status(200).json({ message: "update failed"});
      }
      res.status(200).json({ message: "success"});
      break;
    case "DELETE":
      check_result = checkAttr(body, ["taskId"], true);
      if(!check_result){
        return res.status(200).json({ message: "wrong attributes"});
      }

      result = await Task.deleteOne({
        taskId: body.taskId,
        adminId: userId  // 保证有权限删除该task
      });
      if(result.deletedCount !== 1){
        return res.status(200).json({ message: "delete failed"});
      }

      // 先删task再删relation，如果无权限，上一步直接删除失败
      // 用deleteMany而不是deleteOne，因为如果是合作任务，可以删除所有合作的关系
      result = await Relation.deleteMany({
        taskId: body.taskId
      });
      if(result.deletedCount === 0){
        return res.status(200).json({ message: "delete failed"});
      }
    
      res.status(200).json({ message: "success"});
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
