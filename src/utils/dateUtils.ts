export const formatDate = (date: Date | null): string => {
    if (!date) return ''; // Handle null or undefined values
  
    if (!(date instanceof Date)) {
      // If date is not an instance of Date, try converting it to a Date object
      date = new Date(date);
    }
  
    return date.toISOString().split('T')[0];
  };