import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import LunarCalendar from '@/components/LunarCalendar';
import { LunarDatePickerType } from './types';

const LunarDatePicker: React.FC<LunarDatePickerType & DatePickerProps> = ({
  value,
  onChange,
  onDateTypeChange,
  onDateChange,
  ...props
}) => {
  const [calenderIsOpen, setCalenderIsOpen] = React.useState(false);
  const { selectDate = dayjs() } = value || {};
  return (
    <DatePicker
      {...props}
      open={calenderIsOpen}
      value={selectDate}
      onClick={() => setCalenderIsOpen(true)}
      panelRender={(...props) => (
        <LunarCalendar
          {...props}
          value={value}
          onChange={onChange}
          setCalenderIsOpen={setCalenderIsOpen}
          onDateTypeChange={onDateTypeChange}
          onDateChange={onDateChange}
        />
      )
    }
    />
  );
};

export default LunarDatePicker;
