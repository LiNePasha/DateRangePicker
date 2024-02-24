import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DateRangePicker.css';
import NamedRanges from '../NamedRanges';

interface DateRangePickerProps {
  onChange: (startDate: Date, endDate: Date) => void;
  dynamicRanges?: number[];
  className?: string;
  style?: React.CSSProperties;
  rangesButtonStyle?: React.CSSProperties;
  fetchData: (startDate: Date, endDate: Date) => void; // Add fetchData prop
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, dynamicRanges = [], className = '', rangesButtonStyle, style = {}, fetchData }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleStartDateChange = (value: Date | Date[]) => {
    const startDate = value as Date;
    startDate.setHours(new Date().getHours());
    setStartDate(startDate);
    if (endDate) {
      fetchData(startDate, endDate); // Call fetchData when both start and end dates are selected
    }
  };
  
  const handleEndDateChange = (value: Date | Date[]) => {
    const endDate = value as Date;
    endDate.setHours(new Date().getHours());
    setEndDate(endDate);
    if (startDate) {
      fetchData(startDate, endDate); // Call fetchData when both start and end dates are selected
    }
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    // Check if both start and end dates are selected
    if (startDate && endDate) {
      setShowPicker(false); // Close the calendar
    }
  }, [startDate, endDate]);

  return (
    <div className={`date-range-picker ${className}`} style={style}>
      <div className="date-range-input" onClick={togglePicker}>
        {startDate && endDate ? `${startDate.toDateString()} - ${endDate.toDateString()}` : 'StartDate to EndDate'}
      </div>
      <div className={`picker-wrapper ${showPicker ? 'show' : ''}`}>
        {showPicker && (
          <>
            <NamedRanges
              dynamicRanges={dynamicRanges}
              onSelectRange={(start, end) => { 
                setStartDate(start); 
                setEndDate(end); 
                onChange(start, end); // Call the onChange function with the selected dates
              }}
              rangesButtonStyle={rangesButtonStyle} 
            />
            <div className="calendars">
              <Calendar
                value={startDate}
                onChange={handleStartDateChange as CalendarProps['onChange']}
                maxDate={endDate || undefined}
              />
              <Calendar
                value={endDate}
                onChange={handleEndDateChange as CalendarProps['onChange']}
                minDate={startDate || undefined}
              />
            </div>
            <button onClick={clearSelection}>Clear</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
