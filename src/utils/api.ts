import axios from 'axios';

const ACCESS_KEY = '7e07963e9557e0fd1730781a1fb91355'; // 'MY_ACCESS_KEY'
const BASE_URL = 'http://api.exchangerate.host'; // HTTP URL

export const fetchExchangeRates = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/timeframe?start_date=${startDate}&end_date=${endDate}&currencies=EGP,CAD&access_key=${ACCESS_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};