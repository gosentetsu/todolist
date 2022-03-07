import React, { useState } from 'react';
import { Calendar, Field, Picker, Popup, DatetimePicker } from 'react-vant';
import type { FormItemProps } from 'react-vant';

type CustomItemProps = {
  value?: any;
  onChange?: (v: any) => void;
  placeholder?: string;
  minHour?: any;
  maxHour?: any;
  minMinute?: any;
  maxMinute?: any;
  hour?: any;
  minute?: any;
  changeTime?: any;
  changeMinute?: any;
  tag?: any;
  changeTempTime?: any;
  temp?: any;
} & FormItemProps;

export function PickerItem(props: CustomItemProps) {
  const { value, onChange, ...fieldProps } = props;
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onConfirm = (val) => {
    onChange(val);
    onCancel();
  };

  const columns = ['学习', '会议', '娱乐', '工作', '其他'];
  return (
    <>
      <Field isLink readonly {...fieldProps} value={value} onClick={onShow} />
      <Popup position="bottom" round visible={visible} onClose={onCancel}>
        <Picker title="选择类型" columns={columns} onConfirm={onConfirm} onCancel={onCancel} />
      </Popup>
    </>
  );
}

export function CalendarItem(props: CustomItemProps) {
  const { value, onChange, ...fieldProps } = props;
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onConfirm = (val) => {
    onChange(val.toLocaleDateString());
    onCancel();
  };
  return (
    <>
      <Field isLink readonly {...fieldProps} value={value} onClick={onShow} />
      <Calendar visible={visible} onClose={onCancel} onConfirm={onConfirm} />
    </>
  );
}

export function TimeItem(props: CustomItemProps) {
  const { value, onChange, minHour, maxHour, minMinute, maxMinute, changeTime, changeMinute,tag,changeTempTime, temp, ...fieldProps } = props;
  const [visible, setVisible] = useState(false);
  
  const onChangeTime = (val)=>{
    onChange(val);
    if (tag == "0") {
      if (val.slice(0,2) == minHour) {
        changeMinute(temp);
      }else {
        changeMinute("00");
      }
    }
    if (tag == "1") {
      if (val.slice(0,2) == maxHour) {
        changeMinute(temp);
      }else {
        changeMinute("59");
      }
    }
  }


  const onShow = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onConfirm = (val) => {
    changeTime(val);
    changeTempTime(val.slice(3,5));
    onChange(val);
    onCancel();
  };

  return (
    <>
      <Field isLink readonly {...fieldProps} value={value} onClick={onShow} />
      <Popup position="bottom" round visible={visible} onClose={onCancel}>
        <DatetimePicker
        title="选择时间"
         type="time" 
         minHour={minHour} 
         minMinute={minMinute} 
         maxHour={maxHour} 
         maxMinute={maxMinute}
         onChange={onChangeTime}
         onConfirm={onConfirm} 
         onCancel={onCancel} 
         value="12:00" />
      </Popup>
    </>
  );
}