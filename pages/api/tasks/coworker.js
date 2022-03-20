import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Task from "../../../models/Task";
import Relation from "../../../models/Relation";
import verifyToken from "../../../lib/verifyToken";
import checkAttr from "../../../lib/checkAttributes";

export default async function handler(req, res) {
  const {
    method,
    body,
    cookies
  } = req;

  if(!cookies || !cookies.token || cookies.userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }

  let check_result = checkAttr(body, ["taskId", "coworkerUserName"], true);
  if(!check_result){
    return res.status(200).json({ message: "wrong attributes"});
  }

  await dbConnect();

  // 检查提供的task是否是该用户创建的
  let result = await Task.findOne({
    taskId: body.taskId,
    adminId: cookies.userId
  });
  if(!result){
    return res.status(200).json({ message: "you don't have permission"});
  }

  let user = await User.findOne({userName: body.coworkerUserName});
  if(!user){
    return res.status(200).json({ message: "the user doesn't exist"});
  }

  let relation = {
    taskId: body.taskId,
    userId: user.userId
  };
  
  result = await Relation.findOne(relation);

  switch (method) {
    case "POST":
      if(result){
        return res.status(200).json({ message: "the user is already in your task"});
      }

      relation.acknowledge = false;
      relation.adminId = cookies.userId;
      await Relation.create(relation);
      res.status(200).json({ message: "success"});
      break;
    case "DELETE":
      if(!result){
        return res.status(200).json({ message: "the user isn't in your task"});
      }

      result = await Relation.deleteOne(relation);
      if(result.deletedCount !== 1){
        return res.status(200).json({ message: "delete failed"});
      }

      res.status(200).json({ message: "success"});
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
