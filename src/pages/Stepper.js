

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker'; // Add the library for file picking
import axios from 'axios';
import config from '../apiservice/config';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

const Stepper = () => {
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
    vrn: '',
    vehicleType: '',
    engineNo: '',
    vin: '',
    stateCode: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState({
    addressProof: [],
    idProof: [],
    ackDocument: [],
    VehicleRC: [],
    FrontImg: [],
    SideImg: [],
    TagImg: []
  });

  const labels = ["Customer Details", "Vehicle Details", "Upload KYC"];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };








  const handleFilePick = async (field) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setFiles({ ...files, [field]: [...files[field], result.uri] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Error picking file: ', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        stepCount={3}
        customStyles={indicatorStyles}
        currentPosition={currentStep}
        labels={labels}
      />

      <ScrollView style={styles.stepContainer}>
        {/* Step 1: Customer Registration */}
        {currentStep === 0 && (
        <Step1 />
        )}

        {/* Step 2: Vehicle Registration */}
        {currentStep === 1 && (
        <Step2 />
        )}

        {/* Step 3: Upload KYC */}
        {currentStep === 2 && (
          <View style={styles.formContainer}>
            {/* File Upload Fields */}
            {['addressProof', 'idProof', 'ackDocument', 'VehicleRC', 'FrontImg', 'SideImg', 'TagImg'].map((field) => (
              <View key={field}>
                <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={() => handleFilePick(field)}>
                  <Text style={styles.uploadButtonText}>Upload {field}</Text>
                </TouchableOpacity>
                {files[field].map((file, index) => (
                  <Image key={index} source={{ uri: file }} style={styles.imagePreview} />
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Button mode="outlined" onPress={previousStep} style={styles.prevButton}>
            Previous
          </Button>
        )}
        {currentStep < 2 && (
          <Button mode="contained" onPress={nextStep} style={styles.nextButton}>
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Button mode="contained" onPress={() => alert('Form Submitted!')} style={styles.submitButton}>
            Submit
          </Button>
        )}
      </View>
    </View>
  );
};

const indicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#FF4500', // orange
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#FF4500',
  stepStrokeUnFinishedColor: '#8B0000', // dark red
  separatorFinishedColor: '#FF4500',
  separatorUnFinishedColor: '#8B0000',
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: '#FFFFFF',
  stepIndicatorCurrentColor: '#FFFFFF',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#FF4500',
  stepIndicatorLabelFinishedColor: '#FFFFFF',
  stepIndicatorLabelUnFinishedColor: '#8B0000',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  stepContainer: {
    marginTop: 30,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily:"Poppins-Regular",
    color:"#333",
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prevButton: {
    flex: 1,
    marginRight: 10,
    borderColor: '#8B0000',
    borderWidth: 1,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#FF4500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007bff',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default Stepper;
