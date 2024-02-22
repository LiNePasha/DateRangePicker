import React, { useState } from 'react';
import { fetchExchangeRates } from '../../utils/api';
import { formatDate } from '../../utils/dateUtils';
import './DateRangePicker.css';

// props types interface
interface DateRangePickerProps {
  onChange: (startDate: string, endDate: string) => void;
  onClick?: () => void;
  dynamicRanges?: number[];
  className?: string;
  style?: React.CSSProperties;
  buttonBgColor?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, onClick, dynamicRanges = [], className = '', buttonBgColor = '#001684', style = {} }) => {

  // State Hooks
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [exchangeRates, setExchangeRates] = useState<{ [date: string]: { USDEGP: number; USDCAD: number } } | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateSelection = async () => {
    setError(''); // Reset error state
    setLoading(true); // Set loading to true while fetching data
    
    // Check if both start_date and end_date are provided
    if (!startDate || !endDate) {
      setError('Please provide both start and end dates.');
      setLoading(false); // Set loading to false
      return;
    }

    // Check if start_date is smaller than end_date
    if (startDate >= endDate) {
      setError('Start date must be smaller than end date.');
      setLoading(false); // Set loading to false
      return;
    }

    try {
      // Fetch exchange rates if validation passes
      onChange(startDate, endDate);
      const response = await fetchExchangeRates(startDate, endDate);
      setExchangeRates(response?.quotes || null);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setError('Error fetching exchange rates. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  const handleNamedRangeSelection = (start: string, end: string) => {
    setError(''); // Reset error state
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <section className={`date-range-picker ${className}`} style={style}>
        {/* Input fields for start and end dates */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />

        {/* Button to fetch data */}
        <button 
          style={{ backgroundColor: buttonBgColor }} 
          onClick={handleDateSelection}>
          Fetch Data
        </button>
      </section>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display loading indicator */}
      {loading && <div className="loading-indicator">Loading...</div>}

      {/* Named ranges */}
      <div className="named-ranges">
        <h5>Named Ranges</h5>
          {dynamicRanges.map((days) => (
            <button 
              style={{ backgroundColor: buttonBgColor }}
              key={days} onClick={() => handleNamedRangeSelection(getLastNDays(days), getCurrentDate())}>
                Last {days} Days
            </button>
          ))}
        </div>

      {/* Table of exchange rates */}
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
                <td>{rates.USDEGP}</td>
                <td>{rates.USDCAD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

// Helper function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to get the date of the last N days in YYYY-MM-DD format
const getLastNDays = (n: number) => {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - n);
  return formatDate(targetDate);
};

export default DateRangePicker;
