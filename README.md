## Technical:

- React.js + TypeScript + CSS + Vite.

## How it works:

- We Can Choose Start_Date & End_Date then fetch Data from exchangerate API.
- After Click Fetch Data will display into a HTML Table of exchange rates for EGP and CAD currencies, One row per day of selected range.

- ## Flexible Props:

```react
import React from 'react';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';

const App: React.FC = () => {
  const handleDateChange = (startDate: string, endDate: string) => {
    // Handle date change event
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  // array of dynamic ranges
  const dynamicRanges = [7, 14, 30, 90];

  return (
    <div className="App">
      <header>
          {/* Swypex Logo */}
          <img 
            src='https://framerusercontent.com/images/2oMLjXEOV94NTYr02cFAg7ldk.svg' 
            alt='Swypex Logo' 
          />
          <span>Date Picker</span>
      </header>

      <main>
        <DateRangePicker 
          onChange={handleDateChange} // date change event
          dynamicRanges={dynamicRanges} // dynamic ranges
          className="custom-date-picker" // Add custom class name
          buttonBgColor='#001684' // Add custom button background color
          style={{ display: 'flex', justifyContent: 'center' , border: '1px solid gray' }} // Add custom inline styles
        />
      </main>


    </div>
  );
};

export default App;
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
