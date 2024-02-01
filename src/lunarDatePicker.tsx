import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { LunarDatePickerType } from '@/types';
import LunarCalendar from '@/components/LunarCalendar';

const LunarDatePicker: React.FC<LunarDatePickerType> = ({value, onChange}) => {
  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
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
