import cookie from "cookie";
import verifyToken from "../../../lib/verifyToken"

export default (req, res) => {
  const { method, cookies } = req;
  if(!cookies || !cookies.token || cookies.userId !== verifyToken(cookies.token)){
    return res.status(200).json({ message: "please sign in"});
  }

  switch (method) {
    case "GET":
      res.setHeader(
        "Set-Cookie", [
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        }),
        cookie.serialize("userId", "", {
          httpOnly: false,
          secure: process.env.NODE_ENV !== "development",
          maxAge: new Date(0),
          sameSite: "strict",
          path: "/",
        })
      ]);
      res.status(200).json({ message: "success" });
      break;
    default:
      res.status(400).json({ message: "null" });
      break;
  }
}