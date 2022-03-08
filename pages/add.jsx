import React from "react";
import { useRouter } from 'next/router';
import AddCard from "../components/AddCard";
import NavBarCard from "../components/NavBarCard";

export async function getServerSideProps({ req }) {
  const { userId } = req.cookies;
  return {
    props: { userId }, // will be passed to the page component as props
  };
}


export default function Add({ userId }) {
  const router = useRouter();
  const { initdate } = router.query;
  
  return (
    <>
      <NavBarCard title="添加待办" path="/schedule" />
      <AddCard path="/schedule" initdate={initdate} userId={userId} />
    </>
  );
}