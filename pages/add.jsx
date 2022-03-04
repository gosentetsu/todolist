import React from "react";
import { useRouter } from 'next/router';
import AddCard from "../components/AddCard";
import NavBarCard from "../components/NavBarCard";


export default function Add() {
  const router = useRouter();
  const { initdate } = router.query;
  
  return (
    <>
      <NavBarCard title="添加待办" path="/schedule" />
      <AddCard path="/schedule" initdate={initdate} />
    </>
  );
}