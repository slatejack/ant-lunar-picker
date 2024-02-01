import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import classNames from 'classnames';
import { Calendar, CalendarProps } from 'antd';
import { HolidayUtil, Lunar } from 'lunar-typescript';
import { DateType, LunarCalendarType } from '@/types';
import LunarCalendarHeader from '@/components/LunarCalendarHeader';
import { CALENDER_DATE_TYPE } from '@/constants';
import { useCalendarStyle } from './hooks/useCalendarStyle';

const LunarCalendar: React.FC<LunarCalendarType> = ({ value, onChange, setCalenderIsOpen }) => {
  const { styles } = useCalendarStyle();
  const { type = 'normal', selectDate = dayjs() } = value || {};

  const onDateChange: CalendarProps<Dayjs>['onSelect'] = (value, selectInfo) => {
    if (selectInfo.source === 'date') {
      onChange?.({ type, selectDate: value });
      setCalenderIsOpen(false);
    }
  };

  /**
   * 渲染日历单元格
   * @param date
   * @param info
   */
  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (date, info) => {
    const formatDate = Lunar.fromDate(date.toDate());
    const lunar = formatDate.getDayInChinese();
    const solarTerm = formatDate.getJieQi();
    const holiday = HolidayUtil.getHoliday(
      date.get('year'),
      date.get('month') + 1,
      date.get('date')
    );
    const displayHoliday =
      holiday?.getTarget() === holiday?.getDay() ? holiday?.getName() : '';
    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...info.originNode.props,
        className: classNames(styles.dateCell, {
          [styles.current]: value?.selectDate.isSame(date, 'date'),
          [styles.today]: date.isSame(dayjs(), 'date'),
        }),
        children: (
          <div className={styles.text}>
            {date.get('date')}
            {info.type === 'date' && (
              <div className={styles.lunar}>
                {displayHoliday || solarTerm || lunar}
              </div>
            )}
          </div>
        ),
      });
    }

    if (info.type === 'month') {
      // Due to the fact that a solar month is part of the lunar month X and part of the lunar month X+1,
      // when rendering a month, always take X as the lunar month of the month
      const dateForMonth = Lunar.fromDate(new Date(date.get('year'), date.get('month')));
      const month = dateForMonth.getMonthInChinese();
      return (
        <div
          className={
            classNames(styles.monthCell, {
              [styles.monthCellCurrent]: value?.selectDate.isSame(date, 'month'),
            })}
        >
          {date.get('month') + 1}月（{month}月）
        </div>
      );
    }
  };

  const onDateTypeChange = (type: DateType) => {
    onChange?.({ type, selectDate });
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        fullCellRender={type === CALENDER_DATE_TYPE.lunar ? cellRender : undefined}
        fullscreen={false}
        onSelect={onDateChange}
        headerRender={props => (
          <LunarCalendarHeader
            {...props}
            dateType={type}
            onDateTypeChange={onDateTypeChange}
            setCalenderIsOpen={setCalenderIsOpen}
          />
        )}
      />
    </div>
  );
};


export default LunarCalendar;
