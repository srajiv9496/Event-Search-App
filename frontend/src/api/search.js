import axios from 'axios';

export const searchEvents = async ({ searchString, startTime, endTime, page = 1 }) => {
  const params = {
    search_string: searchString,
    start_time: startTime,
    end_time: endTime,
    page,
  };

  const response = await axios.get(`/api/search/`, { params });

  // const response = await axios.get('http://backend:8000/api/search/', { params });

  console.log('API response:', response.data);
  return response.data;
};
