

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker'; // Add the library for file picking
import axios from 'axios';
import config from '../apiservice/config';

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

  const labels = ["Customer Registration", "Vehicle Registration", "Upload KYC"];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };



  const generateOtp = async () => {
    if (!formData.contactNo || formData.contactNo.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit contact number.');
      return;
    }


    const data = {
      entityId: 'M2PPTEST',
      mobileNumber: `+91${formData.contactNo}`,
      businessType: 'LQFLEET115',
      entityType: 'CUSTOMER',
    };

    const headers = {
      TENANT: process.env.TENANT,
      partnerId: process.env.PARTNER_ID,
      partnerToken: process.env.PARTNER_TOKEN,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(config.SEND_OTP, data, { headers });
      console.log('Response:', response.data);
      if (response.data.result.success) {
   
        Alert.alert('Success', 'OTP sent successfully!');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred while sending OTP.');
    } finally {
  
    }
  };


  const postRequest = async () => {
    // Validate OTP
    if (!formData.otp || formData.otp.toString().length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
  

    const data = {
      dateInfo: [
        {
          date: formData.DOB || "1998-05-31", // Ensure this is in "YYYY-MM-DD" format
          dateType: "DOB",
        },
      ],
      communicationInfo: [
        {
          emailId: formData.emailAddress || "default@example.com",
          notification: true,
          contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
        },
      ],
      addressInfo: [
        {
          pincode: formData.pincode || 600091,
          country: formData.country || "India",
          state: formData.state || "Tamil Nadu",
          city: formData.city || "Chennai",
          address3: formData.address3 || "", // Default to empty string if not provided
          address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
          address1: formData.address1 || "21/A Kalaimagal Street",
          addressCategory: formData.addressCategory || "PERMANENT",
        },
      ],
      kycInfo: [
        {
          documentNo: formData.idNumber || "YTRDF5669L",
          documentType: formData.idType ? formData.idType.toUpperCase() : "PAN",
          kycRefNo: formData.eKYCRefNo || "34536",
        },
      ],
      kitInfo: [
        {
          cardType: "VIRTUAL",
          cardCategory: "PREPAID",
          cardRegStatus: "ACTIVE",
          aliasName: `${formData.firstName || "Yogesh"} ${formData.lastName || "p v"}`,
        },
      ],
      kycDocuments: [
        {
          documentType: formData.documentType || "",
          documentFileName: formData.documentFileName || "",
        },
      ],
      customerStatus: "Individual",
      countryCode: "91",
      channelName: "MIN_KYC",
      kycStatus: "MIN_KYC",
      fatcaDecl: "12",
      consent: "Y",
      politicallyExposed: "N",
      entityType: "CUSTOMER",
      businessType: "LQFLEET115",
      business: "LQFLEET115",
      businessId: formData.entityId || "",
      specialDate: "",
      branch: "LQFLEET1103",
      corporate: "LQFLEET115",
      entityId: formData.entityId || "",
      countryofIssue: "IND",
      dependent: false,
      fleetAddField: {
        applicationDate: "",
        applicationNumber: "",
      },
      otp: formData.otp || "",
      contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
      city: formData.city || "Chennai",
      state: formData.state || "Tamil Nadu",
      pincode: formData.pincode || 600091,
      address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
      address: formData.address1 || "21/A Kalaimagal Street",
      dap: "",
      idNumber: formData.idNumber || "YTRDF5667L",
      proofType: formData.idType ? formData.idType.toUpperCase() : "PAN",
      dob: formData.DOB || "",
      gender: formData.gender || "M",
      lastName: formData.lastName || "p v",
      firstName: formData.firstName || "Yogesh",
      emailAddress: formData.emailAddress || "yogeshagu@gmail.com",
      country: formData.country || "India",
      reqBranch: "",
      preference: {
        address: [
          {
            country: formData.country || "India",
            city: formData.city || "Chennai",
            address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
            address1: formData.address1 || "21/A Kalaimagal Street",
          },
        ],
      },
      title: "M/s",
    };
    
    // Log the final request data for debugging
    console.log("Final Request Data:", JSON.stringify(data, null, 2));
    
    console.log("Request Data:", data);
  
    const headers = {
      TENANT: process.env.TENANT,
      partnerId: process.env.PARTNER_ID,
      partnerToken: process.env.PARTNER_TOKEN,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.post(
        config.CUSTOMER_REGISTER_WITH_OTP, 
        data, 
        { headers }
      );
      
      console.log('Response:', response.data);
    
      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'Registration successful!');
      } else {
        console.log("API Error:", response.data);
        Alert.alert('Error', response.data.exception?.shortMessage || 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    
      // Extract meaningful error message
      const errorMessage = error.response?.data?.exception?.shortMessage || 
                           error.response?.data?.detailMessage || 
                           'An error occurred during registration.';
    
      Alert.alert('Error', errorMessage);
    }
    
    
  };


  const step2 = async () => {
    // Validate OTP
    if (!formData.otp || formData.otp.toString().length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
  

    const data = {
      dateInfo: [
        {
          date: formData.DOB || "1998-05-31", // Ensure this is in "YYYY-MM-DD" format
          dateType: "DOB",
        },
      ],
      communicationInfo: [
        {
          emailId: formData.emailAddress || "default@example.com",
          notification: true,
          contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
        },
      ],
      addressInfo: [
        {
          pincode: formData.pincode || 600091,
          country: formData.country || "India",
          state: formData.state || "Tamil Nadu",
          city: formData.city || "Chennai",
          address3: formData.address3 || "", // Default to empty string if not provided
          address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
          address1: formData.address1 || "21/A Kalaimagal Street",
          addressCategory: formData.addressCategory || "PERMANENT",
        },
      ],
      kycInfo: [
        {
          documentNo: formData.idNumber || "YTRDF5669L",
          documentType: formData.idType ? formData.idType.toUpperCase() : "PAN",
          kycRefNo: formData.eKYCRefNo || "34536",
        },
      ],
      kitInfo: [
        {
          cardType: "VIRTUAL",
          cardCategory: "PREPAID",
          cardRegStatus: "ACTIVE",
          aliasName: `${formData.firstName || "Yogesh"} ${formData.lastName || "p v"}`,
        },
      ],
      kycDocuments: [
        {
          documentType: formData.documentType || "",
          documentFileName: formData.documentFileName || "",
        },
      ],
      customerStatus: "Individual",
      countryCode: "91",
      channelName: "MIN_KYC",
      kycStatus: "MIN_KYC",
      fatcaDecl: "12",
      consent: "Y",
      politicallyExposed: "N",
      entityType: "CUSTOMER",
      businessType: "LQFLEET115",
      business: "LQFLEET115",
      businessId: formData.entityId || "",
      specialDate: "",
      branch: "LQFLEET1103",
      corporate: "LQFLEET115",
      entityId: formData.entityId || "",
      countryofIssue: "IND",
      dependent: false,
      fleetAddField: {
        applicationDate: "",
        applicationNumber: "",
      },
      otp: formData.otp || "",
      contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
      city: formData.city || "Chennai",
      state: formData.state || "Tamil Nadu",
      pincode: formData.pincode || 600091,
      address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
      address: formData.address1 || "21/A Kalaimagal Street",
      dap: "",
      idNumber: formData.idNumber || "YTRDF5667L",
      proofType: formData.idType ? formData.idType.toUpperCase() : "PAN",
      dob: formData.DOB || "",
      gender: formData.gender || "M",
      lastName: formData.lastName || "p v",
      firstName: formData.firstName || "Yogesh",
      emailAddress: formData.emailAddress || "yogeshagu@gmail.com",
      country: formData.country || "India",
      reqBranch: "",
      preference: {
        address: [
          {
            country: formData.country || "India",
            city: formData.city || "Chennai",
            address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
            address1: formData.address1 || "21/A Kalaimagal Street",
          },
        ],
      },
      title: "M/s",
    };
    
    // Log the final request data for debugging
    console.log("Final Request Data:", JSON.stringify(data, null, 2));
    
    console.log("Request Data:", data);
  
    const headers = {
      TENANT: process.env.TENANT,
      partnerId: process.env.PARTNER_ID,
      partnerToken: process.env.PARTNER_TOKEN,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.post(
        config.VAHAN_FIELDS, 
        data, 
        { headers }
      );
      
      console.log('Response:', response.data);
    
      if (response.data.status === 'SUCCESS') {
        Alert.alert('Success', 'Registration successful!');
      } else {
        console.log("API Error:", response.data);
        Alert.alert('Error', response.data.exception?.shortMessage || 'Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    
      // Extract meaningful error message
      const errorMessage = error.response?.data?.exception?.shortMessage || 
                           error.response?.data?.detailMessage || 
                           'An error occurred during registration.';
    
      Alert.alert('Error', errorMessage);
    }
    
    
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
          <View style={styles.formContainer}>
          <Text style={styles.label}>Entity ID</Text>
          <TextInput
            style={styles.input}
            value={formData.entityId}
            onChangeText={(value) => handleChange('entityId', value)}

            // editable={false}
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
            // keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(value) => handleChange('contactNo', value)}
          />
           <TouchableOpacity onPress={generateOtp}>
              <Text style={styles.otpText}>Resend OTP</Text>
            </TouchableOpacity>
            <Text style={styles.label}>OTP</Text>

           
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(value) => handleChange('otp', value)}
          />
          <Text style={styles.label}>Gender</Text>

             <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(value) => handleChange('gender', value)}
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
            // keyboardType="numeric"
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
          <TouchableOpacity onPress={postRequest} >
            <Text style={styles.submitText}>Submit</Text> 
          </TouchableOpacity>
        </View>
        )}

        {/* Step 2: Vehicle Registration */}
        {currentStep === 1 && (
          <View style={styles.formContainer}>
          <Text style={styles.label}>Vehicle Registration Number</Text>
          <TextInput
            style={styles.input}
            value={formData.vrn}
            onChangeText={(value) => handleChange('vrn', value)}
          />
          <Text style={styles.label}>Vehicle Type</Text>
          <TextInput
            style={styles.input}
            value={formData.vehicleType}
            onChangeText={(value) => handleChange('vehicleType', value)}
          />
          <Text style={styles.label}>Engine Number</Text>
          <TextInput
            style={styles.input}
            value={formData.engineNo}
            onChangeText={(value) => handleChange('engineNo', value)}
          />
          <Text style={styles.label}>VIN</Text>
          <TextInput
            style={styles.input}
            value={formData.vin}
            onChangeText={(value) => handleChange('vin', value)}
          />
          <Text style={styles.label}>State Code</Text>
          <TextInput
            style={styles.input}
            value={formData.stateCode}
            onChangeText={(value) => handleChange('stateCode', value)}
          />
        </View>
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
