import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import config from '../apiservice/config';
import { Production_URL } from '../apiservice/api';

const TagReplacement = () => {
  const [customerNumber, setcustomerNumber] = useState('')
  const [customerData,  setCustomerData] = useState([])
  const [formData, setFormData] = useState({
    entityId: '',
    oldKitNo: '',
    newKitNo: '',
    contactNo: '',
    emailAddress: '',
    reason: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.entityId || !formData.oldKitNo || !formData.newKitNo) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Production_URL + `/customer/entityID?contactNo=${customerNumber}`);

      console.log("response --custr", response.data.customer)
      setCustomerData(response.data.customer);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const postRequest = async () => {
    if (!validateForm()) return;

    setLoading(true); // Show loader

    const data = {
      entityId: formData.entityId,
      oldKitNo: formData.oldKitNo,
      newKitNo: formData.newKitNo,
      profileId: 'VC4'
    };

    const headers = {
      'Content-Type': 'application/json',
      'TENANT': config.TENANT
    };

    try {
      const response = await axios.post(config.TAG_REPLACEMENT, data, { headers });
      console.log('Response:', response.data);

      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'Tag Replacement Successful!');
      } else {
        Alert.alert('Error', response.data.message || 'Tag Replacement Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred during tag replacement.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Entity ID</Text>
          <TextInput
            style={styles.input}
            value={formData.entityId}
            onChangeText={(value) => handleChange('entityId', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Old Kit Number</Text>
          <TextInput
            style={styles.input}
            value={formData.oldKitNo}
            onChangeText={(value) => handleChange('oldKitNo', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Kit Number</Text>
          <TextInput
            style={styles.input}
            value={formData.newKitNo}
            onChangeText={(value) => handleChange('newKitNo', value)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={[styles.button, loading && styles.disabledButton]} onPress={postRequest} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Request Tag Replacement</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    // padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});

export default TagReplacement;
