import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "PUT":
      let result = await Task.updateOne({taskId: req.body.taskId}, {$set: req.body});
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
