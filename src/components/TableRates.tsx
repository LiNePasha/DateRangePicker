import React from 'react';

interface ExchangeRatesTableProps {
  exchangeRates: { [date: string]: { USDEGP: number; USDCAD: number } };
}

const ExchangeRatesTable: React.FC<ExchangeRatesTableProps> = ({ exchangeRates }) => {
  return (
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
  );
};

export default ExchangeRatesTable;
