import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';
const USERNAME_KEY = 'username';
const USER_KEY = 'username';

export const saveToken = async (token,username,user) => {
  try {
    if (!token || !username || !user) {
      throw new Error("Token, username, or user data is missing");
    }

    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USERNAME_KEY, username);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Get username
export const getUsername = async () => {
  try {
    const storedData = await AsyncStorage.getItem(USERNAME_KEY);
        if (!storedData) return null;

        const parsedData = JSON.parse(storedData); // Convert from JSON to object
        return parsedData.username || parsedData;
  } catch (error) {
      console.error('Error retrieving username:', error);
      return null;
  }
};

// Clear user data on logout
export const clearUserData = async () => {
  try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USERNAME_KEY);
  } catch (error) {
      console.error('Error clearing user data:', error);
  }
};

export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null; // Parse user object
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};