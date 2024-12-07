import "react-datepicker/dist/react-datepicker.css";

import { ja } from "date-fns/locale";
import React, { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { DateInputProps } from "@/types";

const DateInput = forwardRef<DatePicker, DateInputProps>(
    ({ id, selected, onChange, className }) => {
        const Today = new Date();
        registerLocale("ja", ja);

        return (
            <DatePicker
                id={id}
                selected={selected ?? undefined} // `null` を `undefined` に変換
                onChange={(date) => onChange(date)}
                dateFormat="yyyy/MM/dd"
                locale="ja"
                minDate={Today}
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block w-full ${className}`}
            />
        );
    }
);

DateInput.displayName = "DateInput";

export default DateInput;
