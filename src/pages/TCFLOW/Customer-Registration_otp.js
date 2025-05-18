import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const CustomerRegistrationotp = ({navigation}) => {
   const {user,token} = useAuth();
   console.log('User:', user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    entityId: '',
    businessId: '',
    businessType: '',
    firstName: '',
    lastName: '',
    contactNo: '',
    emailAddress: '',
    address1: '',
    address2: '',
    address3: '',
    addressCategory: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    kitNumber: '',
    otp: '',
    idType: 'PAN',
    idNumber: '',
    kycStatus: '',
    eKYCRefNo: '',
    countryOfIssue: 'IND',
    documentType: '',
    documentNumber: '',
    documentExpiryDate: '',
    DOB: '',
    gender: 'M',
  });

useEffect(() => {
  

      const customerString =  AsyncStorage.getItem('customer');

      console.log("cssis", customerString)
}, [])


  useEffect(() => {
    const getStoredData = async () => {
      const storedAddress = await AsyncStorage.getItem('address');
      const storedPandetails = await AsyncStorage.getItem('pandetails');
      const customerString = await AsyncStorage.getItem('customer');
      const customer = customerString ? JSON.parse(customerString) : null;
  
   console.log("customerString",customerString)
  
      const parsedPandetails = storedPandetails ? JSON.parse(storedPandetails) : null;
  
      if (storedAddress) {
        const addressData = JSON.parse(storedAddress);
        setFormData(prevData => ({
          ...prevData,
          address1: addressData.line_1,
          address2: addressData.line_2,
          address3: addressData.street_name,
          city: addressData.city,
          state: addressData.state,
          pincode: addressData.zip,
          contactNo: customer?.contactNo || '',
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          address1: 'No address found',
          address2: '',
          address3: '',
          city: '',
          state: '',
          pincode: '',
          contactNo: customer?.contactNo || '',
           idNumber: customer?.panNumber || '',
        }));
      }
  
      if (parsedPandetails) {
        setFormData(prevData => ({
          ...prevData,
          firstName: parsedPandetails.full_name_split?.[1] || '',
          lastName: parsedPandetails.full_name_split?.[2] || '',
          emailAddress: parsedPandetails.email || '',
          DOB: parsedPandetails.dob || '',
          gender: parsedPandetails.gender || '',
          idNumber: parsedPandetails.pan_number || '',
          contactNo: customer?.contactNo || '',
        }));
      }
    };
  
    getStoredData();
  }, []);
  

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };



  const postRequest = async () => {
    if (!formData.firstName || !formData.contactNo || !formData.DOB || !formData.idNumber || !formData.otp) {
      Alert.alert('Missing Fields', 'Please fill all required fields');
      return;
    }
  
    setLoading(true);
  
    try {
      const {
        firstName, lastName, emailAddress, contactNo, DOB, idNumber, idType,
        eKYCRefNo, otp, gender, city, state, country, address1, address2,
        address3, addressCategory, pincode
      } = formData;
  
      const payload = {
        entityType: "CUSTOMER",
        entityId: "M2PPTEST", // Replace with actual generated entityId if needed
        businessType: "LQFLEET115",
        business: "LQFLEET115",
        // businessId: "M2PPTEST",
        corporate: "LQFLEET115",
        branch: "LQFLEET1103",
        // reqBranch: "",
        contactNo: `+91${contactNo}`,
        emailAddress,
        firstName,
        lastName,
        gender,
        dob: DOB,
        idNumber,
        proofType: idType,
        otp,
        kycStatus: "MIN_KYC",
        channelName: "MIN_KYC",
        country,
        countryofIssue: "IND",
        consent: "Y",
        politicallyExposed: "N",
        customerStatus: "Individual",
        countryCode: "91",
        fatcaDecl: "2",
        communicationInfo: [{
          emailId: emailAddress || "goutham@m2p.in",
          contactNo: `+91${contactNo}`,
          notification: true
        }],
        addressInfo: [{
          address1,
          address2,
          address3: address3 || "",
          addressCategory: addressCategory || "PERMANENT",
          city,
          state,
          country,
          pincode: parseInt(pincode, 10)
        }],
        dateInfo: [{
          date: DOB,
          dateType: "DOB"
        }],
        kycInfo: [{
          documentNo: idNumber,
          documentType: idType,
          kycRefNo: eKYCRefNo || "3496"
        }],
        kitInfo: [{
          cardType: "VIRTUAL",
          cardCategory: "PREPAID",
          cardRegStatus: "ACTIVE",
          aliasName: `${firstName} ${lastName}`
        }],
        kycDocuments: [{
          documentType: "", documentFileName: ""
        }],
        preference: {
          address: [{
            address1,
            address2,
            city,
            country
          }]
        },
        fleetAddField: {
          applicationDate: "",
          applicationNumber: ""
        },
        title: "M/s",
        dependent: false,
        // dap: "",
        specialDate: "2025-04-20"
      };
     
      const response = await axios.post(
        `https://api.aktollpark.com/api/customer/register-with-otp?customerNumber=${contactNo}&agentId=${user?.id}`,
        payload
      );
      
  
      Alert.alert('Success', `Customer Registered!\nEntity ID: ${response.data.entityId}`);
      console.log("response.data.updatedCustomer",response.data.updatedCustomer)
      await AsyncStorage.setItem("customer", JSON.stringify(response.data.updatedCustomer));
      navigation.navigate("vehiclereg");
    } catch (error) {
      const errData = error.response?.data;
      const detailMessage = errData?.error?.exception?.detailMessage;
      
      Alert.alert(
        'Error',
        detailMessage || errData?.message || 'Something went wrong'
      );
      
     
      
      // navigation.navigate("vehiclereg");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>

      <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.input}
          value={formData.otp}
          onChangeText={(value) => handleChange('otp', value)}
        />

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(value) => handleChange('firstName', value)}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(value) => handleChange('lastName', value)}
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          value={formData.contactNo}
          onChangeText={(value) => handleChange('contactNo', value)}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={formData.emailAddress}
          onChangeText={(value) => handleChange('emailAddress', value)}
        />

        <Text style={styles.label}>Address1</Text>
        <TextInput
          style={styles.input}
          value={formData.address1}
          onChangeText={(value) => handleChange('address1', value)}
        />

        <Text style={styles.label}>Address2</Text>
        <TextInput
          style={styles.input}
          value={formData.address2}
          onChangeText={(value) => handleChange('address2', value)}
        />

        <Text style={styles.label}>Address3</Text>
        <TextInput
          style={styles.input}
          value={formData.address3}
          onChangeText={(value) => handleChange('address3', value)}
        />

        <Text style={styles.label}>Address Category</Text>
        <TextInput
          style={styles.input}
          // placeholder="PERMANENT"
          onChangeText={(value) => handleChange('addressCategory', value)}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(value) => handleChange('city', value)}
        />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={formData.state}
          onChangeText={(value) => handleChange('state', value)}
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={formData.country}
          editable={false}
        />

        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.pincode}
          onChangeText={(value) => handleChange('pincode', value)}
        />

        <Text style={styles.label}>ID Type</Text>
        <TextInput
          style={styles.input}
          value={formData.idType}
          onChangeText={(value) => handleChange('idType', value)}
        />

        <Text style={styles.label}>ID Number</Text>
        <TextInput
          style={styles.input}
          value={formData.idNumber}
          onChangeText={(value) => handleChange('idNumber', value)}
        />

        <Text style={styles.label}>KYC Status</Text>
        <TextInput
          style={styles.input}
          value="MIN_KYC"
          onChangeText={(value) => handleChange('kycStatus', value)}
        />

        <Text style={styles.label}>eKYC Reference Number</Text>
        <TextInput
          style={styles.input}
          value="3456"
          onChangeText={(value) => handleChange('eKYCRefNo', value)}
        />

        <Text style={styles.label}>Country of Issue</Text>
        <TextInput
          style={styles.input}
          value="IND"
          editable={false}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={formData.DOB}
          onChangeText={(value) => handleChange('DOB', value)}
        />

<TouchableOpacity
  style={[styles.button, loading && styles.disabledButton]}
  disabled={loading}
  onPress={postRequest}
>
  <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
</TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
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

export default CustomerRegistrationotp;
