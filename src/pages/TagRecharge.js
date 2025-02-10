import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import config from '../apiservice/config'; // Ensure this file contains TENANT & WALLET_RECHARGE

const TagRecharge = () => {
  const [formData, setFormData] = useState({
    fromEntityId: 'LQFLEET11501',
    toEntityId: 'M2PPTEST',
    productId: 'GENERAL',
    description: 'transferfunds',
    amount: '',
    transactionType: 'M2C',
    business: config.TENANT, // Use config instead of process.env
    businessEntityId: config.TENANT,
    transactionOrigin: 'MOBILE',
    externalTransactionId: 'LKGP_49f775_0889',
    yapcode: '1234',
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postRequest = async () => {
    if (!formData.amount || isNaN(parseFloat(formData.amount))) {
      Alert.alert('Error', 'Please enter a valid recharge amount.');
      return;
    }

    const data = {
      fromEntityId: formData.fromEntityId,
      toEntityId: formData.toEntityId,
      productId: formData.productId,
      description: formData.description,
      amount: parseFloat(formData.amount), // Ensure valid number
      transactionType: formData.transactionType,
      business: formData.business,
      businessEntityId: formData.businessEntityId,
      transactionOrigin: formData.transactionOrigin,
      externalTransactionId: formData.externalTransactionId,
      yapcode: formData.yapcode,
    };

    const headers = {
      'Content-Type': 'application/json',
      TENANT: config.TENANT, // Use config instead of process.env
    };

    try {
      const response = await axios.post(config.WALLET_RECHARGE, data, { headers });
      console.log('Response:', response.data);

      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'Recharge Successful!');
      } else {
        Alert.alert('Error', response.data.message || 'Recharge Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred during recharge.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tag ID</Text>
          <TextInput
            style={styles.input}
            value={formData.toEntityId}
            onChangeText={(value) => handleChange('toEntityId', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recharge Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(value) => handleChange('amount', value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={postRequest}>
          <Text style={styles.buttonText}>Recharge Tag</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
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
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
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
  },
});

export default TagRecharge;
