import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import authReq from "../lib/authReq";
export async function getServerSideProps({ req }) {
  if (authReq(req)) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
export default function Index() {
  return null;
}
