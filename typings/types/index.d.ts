import { Dayjs } from 'dayjs';
export type LunarDatePickerMode = 'lunar' | 'normal';
export type LunarDatePickerValue = {
    selectDate: Dayjs;
    type: LunarDatePickerMode;
};
export type DateType = 'lunar' | 'normal';
export type LunarDatePickerType = {
    value?: LunarDatePickerValue;
    onChange?: (value: LunarDatePickerValue) => void;
    onDateTypeChange?: (type: DateType) => void;
    onDateChange?: (value: Dayjs) => void;
};
export type CalenderHeaderType = {
    value: CalenderHeaderValueType;
    type: 'year' | 'month';
    onChange: (date: CalenderHeaderValueType) => void;
    onTypeChange: (type: 'year' | 'month') => void;
    setCalenderIsOpen: (value: boolean) => void;
    dateType: DateType;
    onDateTypeChange: (value: DateType) => void;
};
export type CalenderOptions = {
    label: string;
    value: number;
};
export interface LunarCalendarType extends LunarDatePickerType {
    setCalenderIsOpen: (value: boolean) => void;
}
export interface CalenderHeaderValueType extends Dayjs {
    localeData?: any;
}
