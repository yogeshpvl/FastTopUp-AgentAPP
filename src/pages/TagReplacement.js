import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import config from '../apiservice/config';
import { Production_URL } from '../apiservice/api';

const TagReplacement = ({ navigation }) => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [formData, setFormData] = useState({
    entityId: '',
    oldKitNo: '',
    newKitNo: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ customerNumber: '', newKitNo: '' });

  const validateCustomerNumber = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value) ? '' : 'Enter a valid 10-digit phone number';
  };

  const validateNewKitNo = (value) => {
    return value.trim() ? '' : 'New Kit Number is required';
  };

  const handleCustomerNumberChange = (value) => {
    setCustomerNumber(value);
    setErrors((prev) => ({ ...prev, customerNumber: validateCustomerNumber(value) }));
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'newKitNo') {
      setErrors((prev) => ({ ...prev, newKitNo: validateNewKitNo(value) }));
    }
  };

  const fetchCustomer = async () => {
    const error = validateCustomerNumber(customerNumber);
    if (error) {
      setErrors((prev) => ({ ...prev, customerNumber: error }));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${Production_URL}/customer/entityID?contactNo=${customerNumber}`);
      const customer = response.data.customer;

      if (customer) {
        setCustomerData(customer);
        setFormData({
          entityId: customer.entityId || '',
          oldKitNo: customer.kitNo || '',
          newKitNo: '',
        });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Customer details fetched successfully!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Customer not found.',
        });
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch customer details.',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newKitNoError = validateNewKitNo(formData.newKitNo);
    if (newKitNoError || !formData.entityId || !formData.oldKitNo) {
      setErrors((prev) => ({ ...prev, newKitNo: newKitNoError }));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields.',
      });
      return false;
    }
    return true;
  };

  const postRequest = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const data = {
      entityId: formData.entityId,
      oldKitNo: formData.oldKitNo,
      newKitNo: formData.newKitNo,
      profileId: 'VC4',
    };

    const headers = {
      'Content-Type': 'application/json',
      TENANT: config.TENANT,
    };

    try {
      const response = await axios.post(config.TAG_REPLACEMENT, data, { headers });
      if (response.data.status === 'SUCCESS') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Tag Replacement Successful!',
        });
        resetForm();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'Tag Replacement Failed.',
        });
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'An error occurred during tag replacement.',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCustomerNumber('');
    setCustomerData(null);
    setFormData({ entityId: '', oldKitNo: '', newKitNo: '' });
    setErrors({ customerNumber: '', newKitNo: '' });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#8B0000', '#B22222']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tag Replacement</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" duration={500} style={styles.formContainer}>
          {/* Customer Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Customer Phone Number</Text>
            <View style={[styles.inputWrapper, errors.customerNumber && styles.inputError]}>
              <Icon name="phone" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter customer number (10 digits)"
                placeholderTextColor="#888"
                value={customerNumber}
                onChangeText={handleCustomerNumberChange}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            {errors.customerNumber && <Text style={styles.errorText}>{errors.customerNumber}</Text>}
          </View>

          {/* Verify Button */}
          <Animatable.View animation="pulse" duration={200}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={fetchCustomer}
              disabled={loading}
            >
              <LinearGradient colors={['#8B0000', '#B22222']} style={styles.buttonGradient}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify Customer</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>

          {/* Customer Details Form */}
          {customerData && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Entity ID</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="identifier" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={formData.entityId}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Old Kit Number</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="tag-outline" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={formData.oldKitNo}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Kit Number</Text>
                <View style={[styles.inputWrapper, errors.newKitNo && styles.inputError]}>
                  <Icon name="tag" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter New Kit Number"
                    placeholderTextColor="#888"
                    value={formData.newKitNo}
                    onChangeText={(value) => handleChange('newKitNo', value)}
                  />
                </View>
                {errors.newKitNo && <Text style={styles.errorText}>{errors.newKitNo}</Text>}
              </View>

              {/* Submit and Reset Buttons */}
              <View style={styles.buttonContainer}>
                <Animatable.View animation="pulse" duration={200}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={postRequest}
                    disabled={loading}
                  >
                    <LinearGradient colors={['#8B0000', '#B22222']} style={styles.buttonGradient}>
                      {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>Request Tag Replacement</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </Animatable.View>

                <Animatable.View animation="pulse" duration={200}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetForm}
                    disabled={loading}
                  >
                    <LinearGradient colors={['#616161', '#9E9E9E']} style={styles.buttonGradient}>
                      <Text style={styles.buttonText}>Reset Form</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </>
          )}
        </Animatable.View>
      </ScrollView>

      {/* Loading Overlay */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#8B0000" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      </Modal>

      {/* Toast Configuration */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  placeholder: {
    width: 28, // Match back button size
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
    color: '#555',
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  inputError: {
    borderColor: '#8B0000',
  },
  errorText: {
    fontSize: 12,
    color: '#8B0000',
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  submitButton: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  resetButton: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    marginTop: 10,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});

export default TagReplacement;