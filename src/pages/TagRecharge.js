import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TagRecharge = () => {
  const [formData, setFormData] = useState({
    fromEntityId: 'LQFLEET11501',
    toEntityId: 'M2PPTEST',
    productId: 'GENERAL',
    description: 'transferfunds',
    amount: '',
    transactionType: 'M2C',
    business: 'LQFLEET',
    businessEntityId: 'LQFLEET',
    transactionOrigin: 'MOBILE',
    externalTransactionId: 'LKGP_49f775_0889',
    yapcode: '1234'
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const postRequest = async () => {
    const data = {
      fromEntityId: formData.fromEntityId,
      toEntityId: formData.toEntityId,
      productId: formData.productId,
      description: formData.description,
      amount: parseFloat(formData.amount),
      transactionType: formData.transactionType,
      business: formData.business,
      businessEntityId: formData.businessEntityId,
      transactionOrigin: formData.transactionOrigin,
      externalTransactionId: formData.externalTransactionId,
      yapcode: formData.yapcode
    };
    
    const headers = {
      'Content-Type': 'application/json',
      'TENANT': 'M2P'
    };

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', data, { headers });
      console.log('Response:', response.data);
      if (response.data.status === 'SUCCESS') {
        alert("Recharge Successful");
      } else {
        alert('Recharge Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tag Recharge Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tag ID</Text>
          <TextInput
            style={styles.input}
            value={formData.toEntityId}
            onChangeText={value => handleChange('toEntityId', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recharge Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={value => handleChange('amount', value)}
          />
        </View>

        {/* Submit Button */}
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

  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontFamily:"Poppins-regular",
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
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
