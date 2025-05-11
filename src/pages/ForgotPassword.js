import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    // Basic email validation
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch('https://api.aktollpark.com/api/agent/reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Success', 'Reset link sent! Check your email  ');
        // In a real app, navigate to a ResetPassword screen or wait for user to click email link
        // navigation.navigate('ResetPassword', { token: data.token });
      } else {
        Alert.alert('Error', data.error || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to connect to the server');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="lock-reset" size={80} color="#8B0000" style={styles.icon} />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a password reset link</Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="#8B0000" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading} // Disable input while loading
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} // Apply disabled style when loading
        onPress={handleForgotPassword}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" /> // Show loader
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text> // Show button text
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} disabled={loading}>
        <Text style={[styles.backLink, loading && styles.backLinkDisabled]}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#8B0000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    // elevation: 3,
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
  button: {
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#B22222', // Slightly lighter shade for disabled state
    opacity: 0.7, // Reduce opacity for disabled effect
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  backLink: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#8B0000',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  backLinkDisabled: {
    color: '#999', // Gray out the link when disabled
    textDecorationLine: 'none', // Remove underline for disabled state
  },
});

export default ForgotPassword;