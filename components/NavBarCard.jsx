import React from 'react';
import { useRouter } from "next/router";
import { NavBar } from 'react-vant';

export default function NavBarCard(props) {
  const { title, path } = props;
  const router = useRouter();
  return (
    <NavBar
      title={title}
      leftText="返回"
      onClickLeft={() => {router.push(path)}}
      rightText={''}
      onClickRight={()=>{}}
    />
  );
};
