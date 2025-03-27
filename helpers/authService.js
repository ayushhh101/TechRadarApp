import axios from 'axios';
import { saveToken, getToken, removeToken } from './asyncStorage';

const API_URL = 'http://10.0.2.2:8000'; // Replace with your backend URL

export const register = async (username, email, password, name, city) => {
  
  const requestBody = { username, email, password, name, city };
  console.log("Register request body:", requestBody);
  try {
    const res = await axios.post(`${API_URL}/register`, {
      username, email, password, name, city,
    });
    return res.data;
  } catch (error) {
    console.error('Registration error:', error.response.data);
    if (error.response) {
      console.error('Server responded with:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Check server/network.');
    }
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    await saveToken(res.data.token, res.data.user.username, res.data.user); // Save token in AsyncStorage
    return res.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    if (error.response) {
      console.error('Server responded with:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Check server/network.');
    }
    throw error;
  }
};

export const logout = async () => {
  await removeToken();
};
