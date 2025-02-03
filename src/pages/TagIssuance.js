import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const TagIssuance = () => {
  const [otpSent, setOtpSent] = useState(false);
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
    idType: '',
    idNumber: '',
    kycStatus: '',
    eKYCRefNo: '',
    countryOfIssue: 'IND',
    documentType: '',
    documentNumber: '',
    documentExpiryDate: '',
    DOB: '',
    gender: '',
  });

  // Function to generate a 5-digit random number
  const generateEntityId = () => {
    const randomId = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
    return randomId.toString();
  };

  // Automatically generate and set entityId when the component mounts
  useEffect(() => {
    const entityId = generateEntityId();
    setFormData((prevData) => ({ ...prevData, entityId }));
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const generateOtp = async () => {
    if (!formData.contactNo || formData.contactNo.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit contact number.');
      return;
    }

    setLoading(true);
    const data = {
      entityId: 'M2PPTEST',
      mobileNumber: `+91${formData.contactNo}`,
      businessType: 'LQFLEET115',
      entityType: 'CUSTOMER',
    };

    const headers = {
      TENANT: 'LQFLEET',
      partnerId: 'LQFLEET',
      partnerToken: 'Basic TFFGTEVFVA',
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('https://kycuat.yappay.in/kyc/customer/generate/otp', data, { headers });
      console.log('Response:', response.data);
      if (response.data.result.success) {
        setOtpSent(true);
        Alert.alert('Success', 'OTP sent successfully!');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const postRequest = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    const data = {
      dateInfo: [
        {
          date: formData.DOB,
          dateType: 'DOB',
        },
      ],
      communicationInfo: [
        {
          emailId: formData.emailAddress,
          notification: true,
          contactNo: '+91' + formData.contactNo,
        },
      ],
      addressInfo: [
        {
          pincode: formData.pincode,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          address3: formData.address3,
          address2: formData.address2,
          address1: formData.address1,
          addressCategory: formData.addressCategory || 'PERMANENT',
        },
      ],
      kycInfo: [
        {
          documentNo: formData.idNumber,
          documentType: formData.idType,
          kycRefNo: formData.eKYCRefNo,
        },
      ],
      kitInfo: [
        {
          cardType: 'VIRTUAL',
          cardCategory: 'PREPAID',
          cardRegStatus: 'ACTIVE',
          aliasName: formData.firstName + ' ' + formData.lastName,
        },
      ],
      kycDocuments: [
        {
          documentType: formData.documentType,
          documentFileName: '',
        },
      ],
      customerStatus: 'Individual',
      countryCode: '91',
      channelName: 'MIN_KYC',
      kycStatus: formData.kycStatus || 'MIN_KYC',
      fatcaDecl: '12',
      consent: 'Y',
      politicallyExposed: 'N',
      entityType: 'CUSTOMER',
      businessType: 'LQFLEET115',
      business: 'LQFLEET115',
      businessId: formData.entityId,
      specialDate: '',
      branch: 'LQFLEET1103',
      corporate: 'LQFLEET115',
      entityId: formData.entityId,
      countryofIssue: formData.countryOfIssue,
      dependent: false,
      fleetAddField: {
        applicationDate: '',
        applicationNumber: '',
      },
      otp: formData.otp,
      contactNo: formData.contactNo,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      address2: formData.address2,
      address: formData.address1,
      dap: '',
      idNumber: formData.idNumber,
      proofType: formData.idType,
      dob: formData.DOB,
      gender: formData.gender,
      lastName: formData.lastName,
      firstName: formData.firstName,
      emailAddress: formData.emailAddress,
      country: formData.country,
      reqBranch: '',
      preference: {
        address: [
          {
            country: formData.country,
            city: formData.city,
            address2: formData.address2,
            address1: formData.address1,
          },
        ],
      },
      title: 'M/s',
    };
    const headers = {
      TENANT: 'LQFLEET',
      partnerId: 'LQFLEET',
      partnerToken: 'Basic TFFGTEVFVA',
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('https://kycuat.yappay.in/kyc/v2/register', data, { headers });
      console.log('Response:', response.data);
      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'Registration successful!');
      } else {
        Alert.alert('Error', 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {!otpSent ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Entity ID</Text>
          <TextInput
            style={styles.input}
            value={formData.entityId}
            editable={false}
          />

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('firstName', value)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('lastName', value)}
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(value) => handleChange('contactNo', value)}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(value) => handleChange('emailAddress', value)}
          />

          <Text style={styles.label}>Address1</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('address1', value)}
          />

          <Text style={styles.label}>Address2</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('address2', value)}
          />

          <Text style={styles.label}>Address3</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('address3', value)}
          />

          <Text style={styles.label}>Address Category</Text>
          <TextInput
            style={styles.input}
            placeholder="PERMANENT"
            onChangeText={(value) => handleChange('addressCategory', value)}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('city', value)}
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('state', value)}
          />

          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value="India"
            editable={false}
            onChangeText={(value) => handleChange('country', value)}
          />

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleChange('pincode', value)}
          />

          <Text style={styles.label}>ID Type</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('idType', value)}
          />

          <Text style={styles.label}>ID Number</Text>
          <TextInput
            style={styles.input}
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
            onChangeText={(value) => handleChange('countryOfIssue', value)}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            onChangeText={(value) => handleChange('DOB', value)}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={generateOtp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Sending OTP...' : 'Send OTP'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>OTP</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(value) => handleChange('otp', value)}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={postRequest}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resendButton]}
            onPress={generateOtp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: 'grey',
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
  resendButton: {
    backgroundColor: '#4CAF50',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});

export default TagIssuance;