import React from "react";
import { Calendar } from 'react-vant';


export default function Schedule(props) {
  const { changeDate } = props;
  
  return (  
    <Calendar
    color="#1989fa"
    minDate={new Date(2010, 0, 1)}
    maxDate={new Date(2030, 0, 31)}
    style={{ height: 450 }}
    showConfirm={false}
    poppable={false}
    onSelect={(date) => {
      changeDate(date);
    }}  
    />
    
  );
}
