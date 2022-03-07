import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import generateToken from "../../../lib/generateToken";
import cookie from "cookie";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      let user = await User.findOne({ userName: body.userName });
      if (!user) {
        return res.status(400).json({ message: "the user doesn't exist" });
      }
      if (body.password !== user.password) {
        return res.status(400).json({ message: "password error" });
      }
      let token = generateToken(user.userId, 24); // 第二个参数是过期时间
      res.setHeader("Set-Cookie", [
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 24 * 60 * 60,
          sameSite: "strict",
          path: "/",
        }),
        cookie.serialize("userId", user.userId, {
          httpOnly: false,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 24 * 60 * 60,
          sameSite: "strict",
          path: "/",
        }),
      ]);
      res.status(200).json({
        message: "success",
        entity: { userId: user.userId },
      });
      break;
    default:
      res.status(400).json({ message: "null" });
      break;
  }
}
