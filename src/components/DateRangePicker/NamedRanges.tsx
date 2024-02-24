import React from 'react';

interface NamedRangesProps {
  onSelectRange: (start: Date, end: Date) => void;
  rangesButtonStyle?: React.CSSProperties;
  dynamicRanges: number[];
}

const NamedRanges: React.FC<NamedRangesProps> = ({ onSelectRange, rangesButtonStyle, dynamicRanges }) => {

  const getLastNDays = (numDays: number): [Date, Date] => {
    const endDate = new Date(); // Current date
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - numDays);
    return [startDate, endDate];
  };

  const handleNamedRangeSelection = (numDays: number) => {
    const [start, end] = getLastNDays(numDays);
    onSelectRange(start, end);
  };

  return (
    <div className="named-ranges">
      {dynamicRanges.map((days) => (
        <button
            style={ rangesButtonStyle }
            key={days}
            onClick={() => handleNamedRangeSelection(days)}
        >
          Last {days} Days
        </button>
      ))}
    </div>
  );
};

export default NamedRanges;
