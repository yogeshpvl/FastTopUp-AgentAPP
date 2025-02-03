import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TagIssuance = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const generateOtp = async () => {
    const data = {
      entityId: "M2PPTEST",
      mobileNumber: `+91${mobileNumber}`,
      businessType: "LQFLEET115",
      entityType: "CUSTOMER"
    };

    const headers = {
      'TENANT': 'LQFLEET',
      'partnerId': 'LQFLEET',
      'partnerToken': 'Basic TFFGTEVFVA',
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post('https://kycuat.yappay.in/kyc/customer/generate/otp', data, { headers });
      console.log('Response:', response.data);
      setOtpSent(true);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const verifyOtp = async () => {
    const data = {
      entityId: "M2PPTEST",
      mobileNumber: mobileNumber,
      otp: otp,
    };

    const headers = {
      'TENANT': 'LQFLEET',
      'partnerId': 'LQFLEET',
      'partnerToken': 'Basic TFFGTEVFVA',
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post('https://kycuat.yappay.in/kyc/customer/verify/otp', data, { headers });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Tag Issuance</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <TouchableOpacity style={styles.button} onPress={generateOtp}>
          <Text style={styles.buttonText}>Generate OTP</Text>
        </TouchableOpacity>

        {otpSent && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular', // Poppins Font
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular', // Poppins Font
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular', // Poppins Font
  },
});

export default TagIssuance;
