import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
