## NOTE:

- Fetch not working in vercel because i add free plan key from exchangerate API and use HTTP not HTTPS, but work in local.

## Technical:

- React.js + TypeScript + CSS + Vite.

## How it works:

- We Can Choose Start_Date & End_Date then fetch Data from exchangerate API.
- After Click Fetch Data will display into a HTML Table of exchange rates for EGP and CAD currencies, One row per day of selected range.

  ## Date Range Picker Functionality:

- Allows users to pick a starting date and an end date.
- Provides validation to ensure that both start and end dates are provided.
- Enforces the condition that the start date must be smaller than the end date.
- Handles fetching data from the API based on the selected date range.
- Provides feedback to the user with error messages and a loading indicator during data fetching.

  ## Named Ranges:

- Allows users to select named ranges such as the last N days.
- Clicking on a named range sets the start and end dates accordingly.

  ## Styling and Customization:

- Provides flexibility for styling by allowing custom class name and inline styles for the component and the button.
- Renders the button with a background color specified by the buttonBgColor prop.

  ## Table of Exchange Rates:

- Renders the fetched exchange rates in a table format with the date, EGP, and CAD rates.

  ## Additional Considerations:

- Utilizes utility functions to get the current date and calculate the date of the last N days.
- Proper error handling and feedback to the user in case of errors during data fetching.
  
- ## Flexible Component:

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
