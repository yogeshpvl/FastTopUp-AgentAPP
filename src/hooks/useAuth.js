// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const fetchAuthData = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("userData");
//         const storedToken = await AsyncStorage.getItem("authToken");

//         if (storedUser) setUser(JSON.parse(storedUser));
//         if (storedToken) setToken(storedToken);
//       } catch (error) {
//         console.error("Error loading auth data:", error);
//       }
//     };

//     fetchAuthData();
//   }, []);

//   return { user, token };
// };

// export default useAuth;


import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const storedToken = await AsyncStorage.getItem('authToken');

        console.log("Fetched User from AsyncStorage:", storedUser);
        console.log("Fetched Token from AsyncStorage:", storedToken);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser)); 
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
