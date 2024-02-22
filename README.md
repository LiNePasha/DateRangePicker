## Technical:

- Fetch not working in vercel because i add free plan key from exchangerate API and use HTTP not HTTPS, but work in local.

## Technical:

- React.js + TypeScript + CSS + Vite.

## How it works:

- We Can Choose Start_Date & End_Date then fetch Data from exchangerate API.
- After Click Fetch Data will display into a HTML Table of exchange rates for EGP and CAD currencies, One row per day of selected range.

- ## Flexible Props:

```react

        <DateRangePicker 
          onChange={handleDateChange} // date change event
          dynamicRanges={dynamicRanges} // dynamic ranges
          className="custom-date-picker" // Add custom class name
          buttonBgColor='#001684' // Add custom button background color
          style={{ display: 'flex', justifyContent: 'center' , border: '1px solid gray' }} // Add custom inline styles
        />
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
