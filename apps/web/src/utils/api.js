import axios from 'axios';
import mockData from './mock';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const getUsers = async () => {
  try {
    // const response = await api.get('/users');
    // return response.data;
    return mockData.mockDataUsers;
  } catch (error) {
    console.error(error);
  }
};

export const getUserCreditors = async (userId) => {
  try {
    // const response = await api.get(`/users/${userId}/creditors`);
    // return response.data;
    return mockData.mockDataCreditors;
  } catch (error) {
    console.error(error);
  }
};

// Function to create a user
export const createUser = async (userData) => {
  try {
    // Make a POST request to your API endpoint with the user data
    const response = await axios.post('/api/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

export default api;
