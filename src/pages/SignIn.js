import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Top Section with Logo and Branding */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.jpg")} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.title}>Pay for fuel or pay for toll.</Text>
        <Text style={styles.subtitle}>Make it quicker with FAST To Up</Text>
      </View>

      {/* Login Section */}
      <View style={styles.loginSection}>
        <Text style={styles.label}>LET'S START THE JOURNEY</Text>

        {/* Username Field */}
        <Text style={styles.inputLabel}>User Name*</Text>
        <TextInput style={styles.input} placeholder="Enter User Name" placeholderTextColor="#ccc" />

        {/* Password Field */}
        <Text style={styles.inputLabel}>Password*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />

        {/* Forgot Password and Unlock Links */}
        <View style={styles.linkContainer}>
          <TouchableOpacity>
            <Text style={styles.link}>Unlock User?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate("BottomTab")}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>

        {/* Sign-Up Option */}
        {/* <TouchableOpacity>
          <Text style={styles.signupText}>
            Sign-up as an <Text style={styles.agentLink}>Agent</Text>
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Powered by: Fast To Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#8B0000',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  loginSection: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#8B0000',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: '#8B0000',
    fontSize: 12,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
  },
  agentLink: {
    color: '#8B0000',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#8B0000',
    fontSize: 12,
    marginTop: 20,
  },
});

export default SignIn;
