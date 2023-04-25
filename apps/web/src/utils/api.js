import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});

export const getUsersWithCreditors = async () => {
  try {
    const response = await api.get('/usersWithCreditors');
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from API');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCreditors = async () => {
  try {
    const response = await api.get('/creditors');
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from API');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserCreditors = async (id, creditorData) => {
  try {
    const response = await api.put(`/users/${id}/creditor`, {
      id: Date.now(),
      creditor: {
        id: creditorData[0].id,
        name: creditorData[0].name,
        address: creditorData[0].address,
        email: creditorData[0].email,
        phone: creditorData[0].phone,
      },
      amount_owned: creditorData[0].amount_owned,
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from API');
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Function to create a user
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

export const createCreditor = async (userData) => {
  try {
    const response = await api.post('/creditors', userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to create creditor'
    );
  }
};

export default api;
