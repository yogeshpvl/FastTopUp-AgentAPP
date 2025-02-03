import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        const storedToken = await AsyncStorage.getItem("authToken");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
    };

    fetchAuthData();
  }, []);

  return { user, token };
};

export default useAuth;
