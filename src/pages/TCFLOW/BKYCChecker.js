import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Production_URL } from '../../apiservice/api'; // Adjust the path to your API config

const BKYCChecker = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckBKYC = async () => {
    // Validate mobile number
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter a mobile number');
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual BKYC check API endpoint
      const response = await axios.get(
        `${Production_URL}/customer/bkyc-status?contactNo=${mobileNumber}`,
        {
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers, e.g., partnerId, partnerToken, Authorization, TENANT
            partnerId: 'LQFLEET',
            partnerToken: 'Basic TFFGTEVFVA==',
            Authorization: 'Basic YWRtaW46YWRtaW4=',
            TENANT: 'LQFLEET',
          },
        }
      );

      const data = response.data;

      if (response.status === 200 && data.success) {
        // Adjust based on your API response structure
        Alert.alert('Success', `BKYC Status: ${data.status || 'Completed'}`);
      } else {
        Alert.alert('Error', data.error || 'No BKYC record found for this mobile number');
      }
    } catch (error) {
      console.error('Error checking BKYC:', error);
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="file-check-outline" size={80} color="#8B0000" style={styles.icon} />
      <Text style={styles.title}>BKYC Status Checker</Text>
      <Text style={styles.subtitle}>Enter mobile number to check BKYC status</Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="phone-outline" size={24} color="#8B0000" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
          maxLength={10}
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCheckBKYC}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Check BKYC Status</Text>
        )}
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
    backgroundColor: '#B22222',
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});

export default BKYCChecker;