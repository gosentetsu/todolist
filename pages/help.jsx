import React from 'react';
import { useRouter } from "next/router";
import { Card, Button} from 'react-vant';
import NavBarCard from "../components/NavBarCard";

export default function Help() {
  const router = useRouter();
  return (
    <>
      <NavBarCard title="使用帮助" path="/center" />
      <Card >
        <Card.Body
          style={{
            height: '89vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          首先....
          其次....
          最后....
        </Card.Body>
        
      </Card>
    </>
    
  );
}