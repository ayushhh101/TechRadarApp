import axios from 'axios';
import { saveToken, getToken, removeToken } from './asyncStorage';

const API_URL = 'http://192.168.29.218:8000'; // Replace with your backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add an interceptor to include the token in all requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (username, email, password, name, city,role) => {
  
  const requestBody = { username, email, password, name, city, role };
  console.log("Register request body:", requestBody);
  try {
    const res = await axios.post(`${API_URL}/register`, {
      username, email, password, name, city, role,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
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
