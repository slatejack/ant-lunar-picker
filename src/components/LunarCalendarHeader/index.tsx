import React, { useEffect, useState } from 'react';
import { Lunar } from 'lunar-typescript';
import dayjs, { Dayjs } from 'dayjs';
import { Col, Radio, Row, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { CalenderHeaderType, CalenderHeaderValueType, CalenderOptions, DateType } from '@/types';
import { CALENDER_DATE_TYPE, CALENDER_HEADER_TYPE } from '@/constants';

const LunarCalendarHeader: React.FC<CalenderHeaderType> = ({
  value,
  type,
  onChange,
  onTypeChange,
  setCalenderIsOpen,
  dateType,
  onDateTypeChange,
}) => {
  const [monthOptions, setMonthOptions] = useState<CalenderOptions[]>([]);
  const [options, setOptions] = useState<CalenderOptions[]>([]);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    formatOptions(value, dateType);
  }, [value, dateType]);

  function getYearLabel(year: number, dateType: DateType) {
    const d = Lunar.fromDate(new Date(year + 1, 0));
    return dateType === CALENDER_DATE_TYPE.lunar
      ? `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`
      : `${d.getYear()}年`;
  }

  function getMonthLabel(month: number, value: Dayjs, dateType: DateType) {
    const d = Lunar.fromDate(new Date(value.year(), month));
    const lunar = d.getMonthInChinese();
    return `${month + 1}月${dateType === CALENDER_DATE_TYPE.lunar ? `（${lunar}月）` : ''}`;
  }

  function formatOptions(value: CalenderHeaderValueType, dateType: DateType) {
    const start = 0;
    const end = 12;

    let current = value.clone();
    const localeData = value?.localeData?.();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current = current.month(i);
      months.push(localeData.monthsShort(current));
    }

    const monthOptions = [];
    for (let i = start; i < end; i++) {
      monthOptions.push({
        label: getMonthLabel(i, value, dateType),
        value: i,
      });
    }
    setMonthOptions(monthOptions);

    const year = value.year();
    const month = value.month();
    setMonth(month);
    setYear(year);
    const nowYear = dayjs().year();
    const options = [];
    for (let i = 1950; i <= nowYear; i += 1) {
      options.push({
        label: getYearLabel(i, dateType),
        value: i,
      });
    }
    setOptions(options);
  }

  return (
    <Row justify="end" gutter={8} style={{ padding: 8 }}>
      <Col>
        <Select size="small" value={dateType} onChange={onDateTypeChange} options={CALENDER_HEADER_TYPE} />
      </Col>
      <Col>
        <Select
          size="small"
          className="my-year-select"
          value={year}
          options={options}
          onChange={(newYear) => {
            const now = value.clone().year(newYear);
            onChange(now);
          }}
        />
      </Col>
      <Col>
        <Select
          size="small"
          value={month}
          options={monthOptions}
          onChange={(newMonth) => {
            const now = value.clone().month(newMonth);
            onChange(now);
          }}
        />
      </Col>
      <Col>
        <Radio.Group
          size="small"
          onChange={(e) => onTypeChange(e.target.value)}
          value={type}
        >
          <Radio.Button value="month">月</Radio.Button>
          <Radio.Button value="year">年</Radio.Button>
        </Radio.Group>
      </Col>
      <Col>
        <CloseCircleOutlined rev={undefined} onClick={() => setCalenderIsOpen(false)}/>
      </Col>
    </Row>
  );
};

export default LunarCalendarHeader;

