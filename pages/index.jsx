import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.loggedIn === true) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  });

  // todo: need some auth tool to validate
  // this page should be optimized...
  return (
    <div>
      <h1>need to add authentication and validator</h1>
    </div>
  );
}
