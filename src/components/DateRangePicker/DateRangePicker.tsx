import React, { useState, useEffect } from 'react';
// library for showing the Calendar only :D
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchExchangeRates } from '../../utils/api';
import { formatDate } from '../../utils/dateUtils';
import './DateRangePicker.css';
import NamedRanges from './NamedRanges';

interface DateRangePickerProps {
  dynamicRanges?: number[];
  className?: string;
  style?: React.CSSProperties;
  rangesButtonStyle?: React.CSSProperties;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dynamicRanges = [], className = '', rangesButtonStyle, style = {} }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<{ [date: string]: { USDEGP: number; USDCAD: number } } | null>(null);
  const [error, setError] = useState<string | null>('');
  const [showPicker, setShowPicker] = useState<boolean>(true);

  const handleStartDateChange = (value: Date | Date[]) => {
      const startDate = value as Date;
      startDate.setHours(new Date().getHours());
      setStartDate(startDate);
  };
  
  const handleEndDateChange = (value: Date | Date[]) => {
      const endDate = value as Date;
      endDate.setHours(new Date().getHours());
      setEndDate(endDate);
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setExchangeRates(null);
  };

  const fetchData = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const response = await fetchExchangeRates(startDate, endDate);
      if (response && response.error) {
        setError('API Plan HTTP Access Restricted, please Try Again ( you can open another browser ).');
      } else {
        setExchangeRates(response?.quotes || null);
        setShowPicker(false); // Hide the calendar after fetching data
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setError('API Plan HTTP Access Restricted, please Try Again ( you can open another browser ).');
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      console.log('Fetching dates:', startDate, endDate);
      // Fetch data with selected dates
      fetchData(formatDate(startDate), formatDate(endDate));
      setShowPicker(false); // Hide the calendar after selecting from named ranges
    }
  }, [startDate, endDate]);
  

  const togglePicker = () => {
    setShowPicker(!showPicker); // Toggle the calendar visibility
  };

  return (
    <div className={`date-range-picker ${className}`} style={style}>
      <p className="error-message">Note: Fetch not working on public site because API using HTTP (Run Code Local to see Table Output)</p>
      <div className="date-range-input" onClick={togglePicker}>
        {startDate && endDate ? `${startDate.toDateString()} - ${endDate.toDateString()}` : 'StartDate to EndDate'}
      </div>
      <div className={`picker-wrapper ${showPicker ? 'show' : ''}`}>
      {showPicker && (
        <>
        <NamedRanges
          dynamicRanges={dynamicRanges}
          onSelectRange={(start, end) => { setStartDate(start); setEndDate(end); }}
          rangesButtonStyle={rangesButtonStyle} 
        />
          <div className="calendars">
            <Calendar
              value={startDate}
              onChange={handleStartDateChange as CalendarProps['onChange']}
            />
            <Calendar
              value={endDate}
              onChange={handleEndDateChange as CalendarProps['onChange']}
              minDate={startDate || undefined} // Set minDate only if startDate is defined
            />
          </div>
          <button onClick={clearSelection}>Clear</button>
        </>
      )}
      </div>

      {loading && <div className="loading-indicator">Loading...</div>}
      {error && <p className="error-message">{error}</p>}

      {exchangeRates && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>EGP</th>
              <th>CAD</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(exchangeRates).map(([date, rates]) => (
              <tr key={date}>
                <td>{date}</td>
                <td>{rates.USDEGP.toFixed(2)}</td>
                <td>{rates.USDCAD.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DateRangePicker;
