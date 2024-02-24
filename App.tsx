import React, { useState } from 'react';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Update the type of startDate and endDate to Date
  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
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
        <DateRangePicker 
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          dynamicRanges={dynamicRanges} // dynamic ranges
          className="custom-date-picker" // Add custom class name
          rangesButtonStyle={{ background: '#001684', color: '#fff' }} // Add custom button background color
          style={{  }} // Add custom inline styles
        />
      </main>
    </div>
  );
};

export default App;
