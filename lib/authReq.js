import verifyToken from "./verifyToken";

export default function authReq(req) {
  const { token } = req.cookies;
  let result = verifyToken(token);
  if (typeof result === "string" && result !== "err") {
    return true;
  } else return false;
}
