import React from "react";
import { Calendar } from 'react-vant';


export default function Schedule(props) {
  const { changeDate, taskDays } = props;

  const formatter = (day) => {
    const year = day.date.getYear() + 1900;
    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();
    const today = new Date(new Date()).toLocaleDateString().split('/');
    if (year == today[0] && month == today[1] && date == today[2]) {
      day.text = "今天";
    }
    if(taskDays.has([year,month,date].toString())) {
      day.className = "red";
    }

    return day;

  }
  
  return (  
    <Calendar
    color="#1989fa"
    minDate={new Date(2010, 0, 1)}
    maxDate={new Date(2030, 0, 31)}
    style={{ height: 450 }}
    showConfirm={false}
    poppable={false}
    formatter={formatter}
    onSelect={(date) => {
      changeDate(date);
    }}  
    />
    
  );
}
