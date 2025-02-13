import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import config from '../../apiservice/config';

export default function Step2() {
  const [formData, setFormData] = useState({
    idExpiry: '',
    pincode: '',
    country: 'In',
    state: '',
    city: '',
    address2: '',
    address: '',
    emailAddress: '',
    contactNo: '',
    lastName: '',
    specialDate: '',
    dependant: true,
    gender: '',
    programType: '',
    kycStatus: '',
    business: '',
    parentEntityId: '',
    businessType: '',
    businessId: '',
    countryofIssue: 'IND',
    idType: '',
    idNumber: '',
    entityType: 'TRUCK_CORPORATE',
    color: '',
    kitNo: '',
    profileId: '',
    tagId: '',
    entityId: '',
    comVehicle: '',
    engineNo: '',
    vin: '',
    vrn: '',
    stateCode: '',
    nationalPermit: '',
    registeredVehicle: '',
    vehicleDescriptor: 'Petrol',
    nationalPermitDate: '',
    fleetAddField: {
      entityId: '',
      customerType: '',
      registrationDate: '',
      isCommercial: 'false'
    },
    documents: [{
      docExpDate: '',
      docType: ''
    }]
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const step2 = async () => {
    if (!formData.contactNo) {
      Alert.alert('Error', 'Please enter a valid contact number.');
      return;
    }

    const headers = {
      TENANT: process.env.TENANT,
      partnerId: process.env.PARTNER_ID,
      partnerToken: process.env.PARTNER_TOKEN,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(
        config.VAHAN_FIELDS,
        formData,
        { headers }
      );

      console.log('Response:', response.data);
      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'Registration successful!');
      } else {
        Alert.alert('Error', response.data.exception?.shortMessage || 'Failed to register. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.exception?.shortMessage ||
        error.response?.data?.detailMessage ||
        'An error occurred during registration.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>


<Text style={styles.label}>Entity Id</Text>
<TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('entityId', value)} />



<Text style={styles.label}>Customer Type</Text>
<TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('customerType', value)} />

<Text style={styles.label}>Registration Date</Text>
<TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('registrationDate', value)} />


<Text style={styles.label}>Color</Text>
<TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('color', value)} />
<Text style={styles.label}>Kit No</Text>
<TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('kitNo', value)} />
<Text style={styles.label}>comVehicle</Text>
<TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('comVehicle', value)} />



      <Text style={styles.label}>Vehicle Registration Number</Text>
      <TextInput style={styles.input} value={formData.vrn} onChangeText={(value) => handleChange('vrn', value)} />
      <Text style={styles.label}>Engine Number</Text>
      <TextInput style={styles.input} value={formData.engineNo} onChangeText={(value) => handleChange('engineNo', value)} />
      <Text style={styles.label}>VIN</Text>
      <TextInput style={styles.input} value={formData.vin} onChangeText={(value) => handleChange('vin', value)} />
      <Text style={styles.label}>State Code</Text>
      <TextInput style={styles.input} value={formData.stateCode} onChangeText={(value) => handleChange('stateCode', value)} />
     
      <Text style={styles.label}>nationalPermit</Text>
      <TextInput style={styles.input} value={formData.stateCode} onChangeText={(value) => handleChange('nationalPermit', value)} />
     
      <Text style={styles.label}>registeredVehicle</Text>
      <TextInput style={styles.input} value={formData.stateCode} onChangeText={(value) => handleChange('registeredVehicle', value)} />
     
     
      <Text style={styles.label}>vehicleDescriptor</Text>
      <TextInput style={styles.input} value={formData.stateCode} onChangeText={(value) => handleChange('vehicleDescriptor', value)} />
     
      <Text style={styles.label}>  nationalPermitDate</Text>
      <TextInput style={styles.input} value={formData.stateCode} onChangeText={(value) => handleChange('nationalPermitDate', value)} />
     
    
      <TouchableOpacity style={styles.submitButton} onPress={step2}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});