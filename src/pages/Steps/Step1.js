// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';

// import { Button } from 'react-native-paper';

// import axios from 'axios';
// import config from '../../apiservice/config';

// export default function Step1() {

//   const [formData, setFormData] = useState({
//     entityId: '',
//     businessId: '',
//     businessType: '',
//     firstName: '',
//     lastName: '',
//     contactNo: '',
//     emailAddress: '',
//     address1: '',
//     address2: '',
//     address3: '',
//     addressCategory: '',
//     city: '',
//     state: '',
//     country: 'India',
//     pincode: '',
//     kitNumber: '',
//     otp: '',
//     idType: '',
//     idNumber: '',
//     kycStatus: '',
//     eKYCRefNo: '',
//     countryOfIssue: 'IND',
//     documentType: '',
//     documentNumber: '',
//     documentExpiryDate: '',
//     DOB: '',
//     gender: '',
//     vrn: '',
//     vehicleType: '',
//     engineNo: '',
//     vin: '',
//     stateCode: '',
//   });
//       const generateOtp = async () => {
//         if (!formData.contactNo || formData.contactNo.length !== 10) {
//           Alert.alert('Error', 'Please enter a valid 10-digit contact number.');
//           return;
//         }
    
    
//         const data = {
//           entityId: generateEntityId(),
//           mobileNumber: `+91${formData.contactNo}`,
//           businessType: 'LQFLEET115',
//           entityType: 'CUSTOMER',
//         };
    
//         const headers = {
//           TENANT: process.env.TENANT,
//           partnerId: process.env.PARTNER_ID,
//           partnerToken: process.env.PARTNER_TOKEN,
//           'Content-Type': 'application/json',
//         };
    
//         try {
//           const response = await axios.post(config.SEND_OTP, data, { headers });
//           console.log('Response:', response.data);
//           if (response.data.result.success) {
       
//             Alert.alert('Success', 'OTP sent successfully!');
//           } else {
//             Alert.alert('Error', 'Failed to send OTP. Please try again.');
//           }
//         } catch (error) {
//           console.error('Error:', error.response ? error.response.data : error.message);
//           Alert.alert('Error', 'An error occurred while sending OTP.');
//         } finally {
      
//         }
//       };

      
//   const postRequest = async () => {
//     // Validate OTP
//     if (!formData.otp || formData.otp.toString().length !== 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
//       return;
//     }
  

//     const data = {
//       dateInfo: [
//         {
//           date: formData.DOB || "1998-05-31", // Ensure this is in "YYYY-MM-DD" format
//           dateType: "DOB",
//         },
//       ],
//       communicationInfo: [
//         {
//           emailId: formData.emailAddress || "default@example.com",
//           notification: true,
//           contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
//         },
//       ],
//       addressInfo: [
//         {
//           pincode: formData.pincode || 600091,
//           country: formData.country || "India",
//           state: formData.state || "Tamil Nadu",
//           city: formData.city || "Chennai",
//           address3: formData.address3 || "", // Default to empty string if not provided
//           address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
//           address1: formData.address1 || "21/A Kalaimagal Street",
//           addressCategory: formData.addressCategory || "PERMANENT",
//         },
//       ],
//       kycInfo: [
//         {
//           documentNo: formData.idNumber || "YTRDF5669L",
//           documentType: formData.idType ? formData.idType.toUpperCase() : "PAN",
//           kycRefNo: formData.eKYCRefNo || "34536",
//         },
//       ],
//       kitInfo: [
//         {
//           cardType: "VIRTUAL",
//           cardCategory: "PREPAID",
//           cardRegStatus: "ACTIVE",
//           aliasName: `${formData.firstName || "Yogesh"} ${formData.lastName || "p v"}`,
//         },
//       ],
//       kycDocuments: [
//         {
//           documentType: formData.documentType || "",
//           documentFileName: formData.documentFileName || "",
//         },
//       ],
//       customerStatus: "Individual",
//       countryCode: "91",
//       channelName: "MIN_KYC",
//       kycStatus: "MIN_KYC",
//       fatcaDecl: "12",
//       consent: "Y",
//       politicallyExposed: "N",
//       entityType: "CUSTOMER",
//       businessType: "LQFLEET115",
//       business: "LQFLEET115",
//       businessId: formData.entityId || "",
//       specialDate: "",
//       branch: "LQFLEET1103",
//       corporate: "LQFLEET115",
//       entityId: formData.entityId || "",
//       countryofIssue: "IND",
//       dependent: false,
//       fleetAddField: {
//         applicationDate: "",
//         applicationNumber: "",
//       },
//       otp: formData.otp || "",
//       contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
//       city: formData.city || "Chennai",
//       state: formData.state || "Tamil Nadu",
//       pincode: formData.pincode || 600091,
//       address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
//       address: formData.address1 || "21/A Kalaimagal Street",
//       dap: "",
//       idNumber: formData.idNumber || "YTRDF5667L",
//       proofType: formData.idType ? formData.idType.toUpperCase() : "PAN",
//       dob: formData.DOB || "",
//       gender: formData.gender || "M",
//       lastName: formData.lastName || "p v",
//       firstName: formData.firstName || "Yogesh",
//       emailAddress: formData.emailAddress || "yogeshagu@gmail.com",
//       country: formData.country || "India",
//       reqBranch: "",
//       preference: {
//         address: [
//           {
//             country: formData.country || "India",
//             city: formData.city || "Chennai",
//             address2: formData.address2 || "Paravathi Flats, Puzhitivakkam",
//             address1: formData.address1 || "21/A Kalaimagal Street",
//           },
//         ],
//       },
//       title: "M/s",
//     };
    
//     // Log the final request data for debugging
//     console.log("Final Request Data:", JSON.stringify(data, null, 2));
    
//     console.log("Request Data:", data);
  
//     const headers = {
//       TENANT: process.env.TENANT,
//       partnerId: process.env.PARTNER_ID,
//       partnerToken: process.env.PARTNER_TOKEN,
//       'Content-Type': 'application/json',
//     };
  
//     try {
//       const response = await axios.post(
//         config.CUSTOMER_REGISTER_WITH_OTP, 
//         data, 
//         { headers }
//       );
      
//       console.log('Response:', response.data);
    
//       if (response.data.status === 'SUCCESS') {
//         Alert.alert('Success', 'Registration successful!');
//       } else {
//         console.log("API Error:", response.data);
//         Alert.alert('Error', response.data.exception?.shortMessage || 'Failed to register. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message);
    
//       // Extract meaningful error message
//       const errorMessage = error.response?.data?.exception?.shortMessage || 
//                            error.response?.data?.detailMessage || 
//                            'An error occurred during registration.';
    
//       Alert.alert('Error', errorMessage);
//     }
    
    
//   };
//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };
//   return (
//          <View style={styles.formContainer}>
//              <Text style={styles.label}>Entity ID</Text>
//              <TextInput
//                style={styles.input}
//                value={formData.entityId}
//                onChangeText={(value) => handleChange('entityId', value)}
   
//                // editable={false}
//              />
//              <Text style={styles.label}>First Name</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('firstName', value)}
//              />
//              <Text style={styles.label}>Last Name</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('lastName', value)}
//              />
//              <Text style={styles.label}>Contact Number</Text>
//              <TextInput
//                style={styles.input}
//                // keyboardType="phone-pad"
//                maxLength={10}
//                onChangeText={(value) => handleChange('contactNo', value)}
//              />
//               <TouchableOpacity onPress={generateOtp}>
//                  <Text style={styles.otpText}>Resend OTP</Text>
//                </TouchableOpacity>
//                <Text style={styles.label}>OTP</Text>
   
              
//              <TextInput
//                style={styles.input}
//                keyboardType="phone-pad"
//                maxLength={10}
//                onChangeText={(value) => handleChange('otp', value)}
//              />
//              <Text style={styles.label}>Gender</Text>
   
//                 <TextInput
//                style={styles.input}
//                keyboardType="phone-pad"
//                maxLength={10}
//                onChangeText={(value) => handleChange('gender', value)}
//              />
//              <Text style={styles.label}>Email Address</Text>
//              <TextInput
//                style={styles.input}
//                keyboardType="email-address"
//                onChangeText={(value) => handleChange('emailAddress', value)}
//              />

// <Text style={styles.label}>ID Type</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('idType', value)}
//              />
//              <Text style={styles.label}>ID Number</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('idNumber', value)}
//              />
//              <Text style={styles.label}>Address1</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('address1', value)}
//              />
//              <Text style={styles.label}>Address2</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('address2', value)}
//              />
//              <Text style={styles.label}>Address3</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('address3', value)}
//              />
//              <Text style={styles.label}>Address Category</Text>
//              <TextInput
//                style={styles.input}
//                placeholder="PERMANENT"
//                onChangeText={(value) => handleChange('addressCategory', value)}
//              />
//              <Text style={styles.label}>City</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('city', value)}
//              />
//              <Text style={styles.label}>State</Text>
//              <TextInput
//                style={styles.input}
//                onChangeText={(value) => handleChange('state', value)}
//              />
//              <Text style={styles.label}>Country</Text>
//              <TextInput
//                style={styles.input}
//                value="India"
//                editable={false}
//                onChangeText={(value) => handleChange('country', value)}
//              />
//              <Text style={styles.label}>Pincode</Text>
//              <TextInput
//                style={styles.input}
//                // keyboardType="numeric"
//                onChangeText={(value) => handleChange('pincode', value)}
//              />
            
            
//              <Text style={styles.label}>Country of Issue</Text>
//              <TextInput
//                style={styles.input}
//                value="IND"
//                editable={false}
//                onChangeText={(value) => handleChange('countryOfIssue', value)}
//              />
//              <Text style={styles.label}>Date of Birth</Text>
//              <TextInput
//                style={styles.input}
//                placeholder="YYYY-MM-DD"
//                onChangeText={(value) => handleChange('DOB', value)}
//              />
//              <TouchableOpacity onPress={postRequest} >
//                <Text style={styles.submitText}>Submit</Text> 
//              </TouchableOpacity>
//            </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#FFF',
//   },
//   stepContainer: {
//     marginTop: 30,
//   },
//   formContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     fontFamily:"Poppins-Regular",
//     color:"#333",
//   },
//   input: {
//     width: '100%',
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   prevButton: {
//     flex: 1,
//     marginRight: 10,
//     borderColor: '#8B0000',
//     borderWidth: 1,
//   },
//   nextButton: {
//     flex: 1,
//     marginLeft: 10,
//     backgroundColor: '#FF4500',
//   },
//   submitButton: {
//     flex: 1,
//     backgroundColor: '#007bff',
//   },
//   uploadButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   uploadButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import config from '../../apiservice/config';
import { Production_URL } from '../../apiservice/api';
import useAuth from '../../hooks/useAuth';

export default function Step1({ navigation}) {
   const {user, token} = useAuth();


   useEffect(() => {
     if (!user) {
       navigation.replace('Login'); 
     }
   }, [user, navigation]);

   console.log("user: " + user)
  const generateEntityId = () => {
    return Math.random().toString(36).substr(2, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
  };

  const [formData, setFormData] = useState({
    entityId: generateEntityId(),
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

  const [timer, setTimer] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const generateOtp = async () => {
    if (!formData.contactNo || formData.contactNo.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit contact number.');
      return;
    }

    const data = {
      entityId: generateEntityId(),
      mobileNumber: `+91${formData.contactNo}`,
      businessType: config.businessType,
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
      if (response.data.result.success) {
        Alert.alert('Success', 'OTP sent successfully!');
        setIsOtpSent(true);
        setTimer(120); 
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending OTP.');
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
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
          date: formData.DOB ,
          dateType: "DOB",
        },
      ],
      communicationInfo: [
        {
          emailId: formData.emailAddress ,
          notification: true,
          contactNo: formData.contactNo ? `+91${formData.contactNo}` : "",
        },
      ],
      addressInfo: [
        {
          pincode: formData.pincode ,
          country: formData.country,
          state: formData.state ,
          city: formData.city ,
          address3: formData.address3 , 
          address2: formData.address2 ,
          address1: formData.address1 ,
          addressCategory: formData.addressCategory,
        },
      ],
      kycInfo: [
        {
          documentNo: formData.idNumber ,
          documentType: formData.idType ? formData.idType.toUpperCase() : "PAN",
          kycRefNo: formData.eKYCRefNo || "34536",
        },
      ],
      kitInfo: [
        {
          cardType: "VIRTUAL",
          cardCategory: "PREPAID",
          cardRegStatus: "ACTIVE",
          aliasName: `${formData.firstName } ${formData.lastName }`,
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
      city: formData.city ,
      state: formData.state ,
      pincode: formData.pincode ,
      address2: formData.address2 ,
      address: formData.address1 ,
      dap: "",
      idNumber: formData.idNumber ,
      proofType: formData.idType ? formData.idType.toUpperCase() : "PAN",
      dob: formData.DOB ,
      gender: formData.gender ,
      lastName: formData.lastName ,
      firstName: formData.firstName ,
      emailAddress: formData.emailAddress ,
      country: formData.country || "India",
      reqBranch: "",
      preference: {
        address: [
          {
            country: formData.country || "India",
            city: formData.city ,
            address2: formData.address2 ,
            address1: formData.address1 ,
          },
        ],
      },
      title: "M/s",
    };
    
  
  
    const headers = {

      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.post(
        `${Production_URL}/${config.CUSTOMER_REG}/${user?._id}`, 
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Entity ID</Text>
      <TextInput style={styles.input} value={formData.entityId} editable={false} />

      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('firstName', value)} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('lastName', value)} />

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(value) => handleChange('contactNo', value)}
      />

      {!isOtpSent || timer === 0 ? (
        <Text style={styles.otpText} onPress={generateOtp}>
          Send OTP
        </Text>
      ) : (
        <Text style={styles.timerText}>
          Resend OTP in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
        </Text>
      )}

      <Text style={styles.label}>OTP</Text>
      <TextInput style={styles.input} keyboardType="numeric" maxLength={6} onChangeText={(value) => handleChange('otp', value)} />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={formData.gender} style={styles.picker} onValueChange={(itemValue) => handleChange('gender', itemValue)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="M" />
          <Picker.Item label="Female" value="F" />
        </Picker>
      </View>

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} keyboardType="email-address" onChangeText={(value) => handleChange('emailAddress', value)} />

      <Text style={styles.label}>ID Type</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={formData.idType} style={styles.picker} onValueChange={(itemValue) => handleChange('idType', itemValue)}>
          <Picker.Item label="Aadhar" value="Aadhar" />
          <Picker.Item label="PAN" value="PAN" />
          <Picker.Item label="Driving Licence" value="Driving Licence" />
          <Picker.Item label="Voter ID" value="Voter ID" />
          <Picker.Item label="Passport" value="Passport" />
        </Picker>
      </View>

      <Text style={styles.label}>ID Number</Text>
      <TextInput style={styles.input} onChangeText={(value) => handleChange('idNumber', value)} />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput style={styles.input} placeholder="YYYY-MM-DD" onChangeText={(value) => handleChange('DOB', value)} />
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
              
             <Text style={styles.label}>Pincode</Text>
             <TextInput
               style={styles.input}
               // keyboardType="numeric"
               onChangeText={(value) => handleChange('pincode', value)}
             />
             <Text style={styles.label}>State</Text>
             <TextInput
               style={styles.input}
               onChangeText={(value) => handleChange('state', value)}
             />
            
            <TouchableOpacity onPress={postRequest}>
              <Text>SUBMIT</Text>
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  otpText: {
    textDecorationLine: 'underline',
    color: 'darkred',
    textAlign: 'right',
    fontSize: 16,
    marginBottom: 8,
  },
  timerText: {
    color: 'gray',
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    width: '100%',
  },
});

