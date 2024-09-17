import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

export const AxioPost = async (endpoint, payload, withCredentials = true) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials,
    });
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error; 
  }
};

export const AxioGet = async (endpoint, params = {}, withCredentials = true) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials,
      params, // Pass query parameters here
    });
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

