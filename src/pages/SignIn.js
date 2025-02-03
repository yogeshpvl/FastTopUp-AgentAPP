import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Production_URL } from '../apiservice/api';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(Production_URL + "/agent/agentLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(data.data)); // Store user data
        Alert.alert("Success", "Logged in successfully");
        
        
        navigation.navigate("BottomTab");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo.jpg")} style={styles.logo} />
        <Text style={styles.subtitle}>Make it quicker with FAST To Up</Text>
      </View>

      <View style={styles.loginSection}>
        <Text style={styles.label}>LET'S START THE JOURNEY</Text>

        <Text style={styles.inputLabel}>User Email*</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter User email" 
          placeholderTextColor="#ccc" 
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>Password*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.linkContainer}>
          <TouchableOpacity>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginText}>{loading ? "Logging in..." : "LOG IN"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Powered by: Fast To Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#8B0000', paddingVertical: 30, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  logo: { width: 100, height: 100, marginBottom: 10 },
  subtitle: { color: '#fff', fontSize: 14 },
  loginSection: { padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#8B0000', marginBottom: 20, textAlign: 'center' },
  inputLabel: { color: '#8B0000', marginBottom: 5, fontSize: 14 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 20, fontSize: 16 },
  linkContainer: { flexDirection: 'row', justifyContent: 'flex-end' },
  link: { color: '#8B0000', fontSize: 12, fontWeight: '600' },
  loginButton: { backgroundColor: '#8B0000', paddingVertical: 10, borderRadius: 20, alignItems: 'center', marginVertical: 20 },
  loginText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', color: '#8B0000', fontSize: 12, marginTop: 20 },
});

export default SignIn;
