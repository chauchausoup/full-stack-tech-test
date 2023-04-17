import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserCreditors = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/creditors`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default api;
