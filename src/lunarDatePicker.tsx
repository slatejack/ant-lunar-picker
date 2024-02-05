import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import LunarCalendar from '@/components/LunarCalendar';
import { LunarDatePickerType } from './types';

const LunarDatePicker: React.FC<LunarDatePickerType> = ({value, onChange}) => {
  const [calenderIsOpen, setCalenderIsOpen] = React.useState(false);
  const { selectDate = dayjs() } = value || {};
  return (
    <DatePicker
      open={calenderIsOpen}
      value={selectDate}
      onClick={() => setCalenderIsOpen(true)}
      panelRender={(...props) => (
        <LunarCalendar
          {...props}
          value={value}
          onChange={onChange}
          setCalenderIsOpen={setCalenderIsOpen}
        />
      )
    }
    />
  );
};

export default LunarDatePicker;
