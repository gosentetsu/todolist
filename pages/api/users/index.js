import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      let idLength = 6;
      let idChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let userId = "U_";
      for(let i = 0; i < idLength; i++){
          let ind = Math.floor(Math.random()*62);
          userId += idChar[ind];
      }
      
      let user = {
        userId: userId,
        userName: req.body.userName,
        password: req.body.password,
        slogan: "",
        picUrl: "",
        taskIds: []
      };
      await User.create(user);
      res.status(200).json({ 
        message: "success",
        entity: {userId: userId}
      });
      break;
    default:
      res.status(400).json({ message: "null"});
      break;
  }
}
