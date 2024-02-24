import React, { useState } from 'react';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import { fetchExchangeRates } from './utils/api';
import { formatDate } from './utils/dateUtils';
import TableRates from './components/TableRates';

const App: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<{ [date: string]: { USDEGP: number; USDCAD: number } } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (startDate: Date, endDate: Date) => {
    setLoading(true);
    try {
      const response = await fetchExchangeRates(formatDate(startDate), formatDate(endDate));
      if (response && response.error) {
        setError('API Plan HTTP Access Restricted, please Try Again ( you can open another browser ).');
      } else {
        setExchangeRates(response?.quotes || null);
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setError('Error fetching exchange rates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    fetchData(startDate, endDate);
  };

  // array of dynamic ranges
  const dynamicRanges = [7, 14, 30, 90];

  return (
    <div className="App">
      <header>
        {/* Swypex Logo */}
        <img 
          src='https://res.cloudinary.com/dzxbbqq4l/image/upload/v1708730288/2oMLjXEOV94NTYr02cFAg7ldk_1_taudli.webp' 
          alt='Swypex Logo' 
        />
        <span>Date Picker</span>
      </header>

      <main>
        <h1>Click to open Date-Range-Picker</h1>
        <DateRangePicker 
          onChange={handleDateRangeChange}
          dynamicRanges={dynamicRanges} // dynamic ranges
          className="custom-date-picker" // Add custom class name
          rangesButtonStyle={{ background: '#001684', color: '#fff' }} // Add custom button background color
          style={{  }} // Add custom inline styles
          fetchData={fetchData} // Pass the fetchData function as prop
        />
      </main>

      {loading && <div className="loading-indicator">Loading...</div>}
      {error && <p className="error-message">{error}</p>}

      {exchangeRates && <TableRates exchangeRates={exchangeRates} />}
    </div>
  );
};

export default App;
