import React from 'react';
import { useRouter } from "next/router";
import { Card, Button} from 'react-vant';

export default function Help() {
  const router = useRouter();
  return (
    <Card round>
      <Card.Header>
        <div style={{ textAlign: 'center' }}>使用帮助</div>
      </Card.Header>
      <Card.Body
        style={{
          height: '86vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        首先....
        其次....
        最后....
      </Card.Body>
      <Card.Footer>
        <Button type="primary" round block size="mini" onClick={()=>{router.push("/center")}}>
          返回
        </Button>
      </Card.Footer>
    </Card>
  );
}