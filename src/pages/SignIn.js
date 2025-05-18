import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform,
  Keyboard, // Import Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Production_URL } from '../apiservice/api';
import useAuth from '../hooks/useAuth';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // State to track keyboard visibility
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('BottomTab');
    }
  }, [user, navigation]);

  // Add keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // Keyboard is visible
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // Keyboard is hidden
    });

    // Clean up listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    if (password.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(Production_URL + '/agent/agentLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.token) {
          throw new Error('No token received from server');
        }
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        setUser(data.data);
        navigation.navigate('BottomTab');
      } else {
        Alert.alert('Error', data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <LinearGradient colors={['#8B0000', '#B22222']} style={styles.header}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.subtitle}>Make it quicker with FAST To Up</Text>
      </LinearGradient>

      <View style={styles.loginSection}>
        {/* Conditionally render the label based on keyboard visibility */}
        {!isKeyboardVisible && (
          <Text style={styles.label}>LET'S START THE JOURNEY</Text>
        )}

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#8B0000"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter User Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color="#8B0000"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.loginText}>LOG IN</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Conditionally render the footer based on keyboard visibility */}
      {!isKeyboardVisible && (
        <Text style={styles.footer}>Powered by SUMUKHA NXT GEN IT SOLUTION</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  loginSection: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#8B0000',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Platform.select({
      android: { elevation: 0 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  link: {
    color: '#8B0000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    textAlign: 'center',
    color: '#8B0000',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
});

export default SignIn;