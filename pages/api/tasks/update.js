import dbConnect from "../../../lib/dbConnect";
import Relation from "../../../models/Relation";
import Task from "../../../models/Task";
import verifyToken from "../../../lib/verifyToken";
import checkAttr from "../../../lib/checkAttributes";

export default async function handler(req, res) {
  const {
    body,
    method,
    cookies
  } = req;

  let result;

  if(!cookies || !cookies.token || cookies.userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }
  
  await dbConnect();

  switch (method) {
    case "GET":
      result = await Relation.find({userId: cookies.userId, acknowledge: false});
      if(result.length === 0){
        return res.status(200).json({ message: "no update"});
      }

      let tasks = [];
      for(let rel of result){
        let task = await Task.findOne({taskId: rel.taskId}).lean();
        delete task._id;
        tasks.push(task);
      }

      res.status(200).json({ message: "success", list: tasks});
      break;
    case "POST":
      let check_result = checkAttr(body, ["taskId", "acknowledge"], true);
      if(!check_result){
        return res.status(200).json({ message: "wrong attributes"});
      }

      let relation = {taskId: body.taskId, userId: cookies.userId, acknowledge: false};
      if(body.acknowledge){
        result = await Relation.updateOne(relation, {$set: {acknowledge: true}});
        if(result.modifiedCount === 0){
          return res.status(200).json({ message: "error"});
        }
      }
      else{
        result = await Relation.deleteOne(relation);
        if(result.deletedCount === 0){
          return res.status(200).json({ message: "error"});
        }
      }
      res.status(200).json({ message: "success"});
      break
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
