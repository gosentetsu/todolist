import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Task from "../../../models/Task";
import Relation from "../../../models/Relation";
import verifyToken from "../../../lib/verifyToken"
import checkAttr from "../../../lib/checkAttributes"

export default async function handler(req, res) {
  const {
    method,
    body,
    cookies
  } = req;

  if(!cookies || !cookies.token || cookies.userId !== verifyToken(cookies.token)){
    return res.status(400).json({ message: "please sign in"});
  }

  let check_result = checkAttr(body, ["taskId", "coworkerUserNam"], true);
  if(!check_result){
    return res.status(400).json({ message: "wrong attributes"});
  }

  let result;

  await dbConnect();

  let user = await User.findOne({taskId: body.coworkerUserNam});
  if(!user){
    return res.status(400).json({ message: "the user doesn't exist"});
  }
  let relation = {
    taskId: body.taskId,
    userId: user.userId
  };

  switch (method) {
    case "POST":
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
