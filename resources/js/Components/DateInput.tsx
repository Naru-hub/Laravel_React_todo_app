import React, { forwardRef, InputHTMLAttributes, useRef, useImperativeHandle, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { DateInputProps } from '@/types';

import DatePicker from 'react-datepicker';

const DateInput = forwardRef<DatePicker, DateInputProps>(
    ({ selected, onChange, className}, ref) => {
        const Today = new Date();

        return (
            <DatePicker
            selected={selected ?? undefined} // `null` を `undefined` に変換
            onChange={date => onChange(date)}
            ref={ref as React.RefObject<DatePicker>} // RefObject<DatePicker> にキャスト
            dateFormat="yyyy/MM/dd"
            minDate={Today}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block w-full ${className}`}
        />
        );
    }
);

DateInput.displayName = 'DateInput';

export default DateInput;
