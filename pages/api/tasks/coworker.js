import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import Relation from "../../../models/Relation";
import verifyToken from "../../../lib/verifyToken"

export default async function handler(req, res) {
  const {
    method,
    body
  } = req;

  if(!body.token || body.userId !== verifyToken(body.token)){
    return res.status(400).json({ message: "please sign in"});
  }

  let result;
  let relation = {
    taskId: body.taskId,
    userId: body.userId
  };

  await dbConnect();

  result = await Relation.findOne(relation);
  if(!result){
    return res.status(400).json({ message: "the task doesn't belong to you"});
  }

  relation.userId = body.coworkerId;

  switch (method) {
    case "POST":
      result = await Task.findOne({taskId: body.taskId});
      if(!result){
        return res.status(400).json({ message: "the task doesn't exist"});
      }
      result = await Relation.findOne(relation);
      if(result){
        return res.status(400).json({ message: "the relation already exists"});
      }

      result = await Relation.create(relation);
      res.status(200).json({ message: "success"});
      break;
    case "DELETE":
      result = await Relation.deleteOne(relation);
      if(result.deletedCount !== 1){
        return res.status(400).json({ message: "delete failed"});
      }

      res.status(200).json({ message: "success"});
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
