import React, { useState } from "react";
import { useRouter } from "next/router"
import { Calendar } from 'react-vant';
import Layout from "../components/Layout";
export default function Schedule() {
  const router = useRouter();
  return (
    <Layout>
      <Calendar
      color="#1989fa"
      minDate={new Date(2010, 0, 1)}
      maxDate={new Date(2023, 0, 31)}
      style={{ height: 450 }}
      showConfirm={false}
      poppable={false}
      onSelect={(v) => {
        router.push("/task")
      }}
    />
    </Layout>
    
  );
}
