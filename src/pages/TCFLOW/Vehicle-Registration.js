import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VehicleRegistration({ navigation }) {
  const [loading, setLoading] = useState(false);
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
    color: '#609',
    kitNo: '6540012000000062',
    profileId: '',
    tagId: '',
    entityId: '',
    comVehicle: 'T',
    engineNo: 'K14MP1346185',
    vin: '78578544',
    vrn: 'KL2CBC4201',
    stateCode: 'In',
    nationalPermit: 'T',
    registeredVehicle: 'F',
    vehicleDescriptor: 'PETROL',
    nationalPermitDate: '12-01-2025',
    fleetAddField: {
      entityId: '',
      customerType: '',
      registrationDate: '',
      isCommercial: 'false',
    },
    documents: [
      {
        docExpDate: '2021-01-27',
        docType: 'RC_NUMBER',
      },
    ],
  });

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const customerString = await AsyncStorage.getItem('customer');
        if (customerString) {
          const customer = JSON.parse(customerString);
          console.log("Parsed customer:", customer);
  
          const customerEntityId = customer?.entityId || '';
  
          setFormData(prev => ({
            ...prev,
            pincode: customer?.address?.[0]?.pincode?.toString() || '',
            country: customer?.address?.[0]?.country || 'In',
            state: customer?.address?.[0]?.state || '',
            city: customer?.address?.[0]?.city || '',
            address2: customer?.address?.[0]?.address2 || '',
            address: customer?.address?.[0]?.address1 || '',
            emailAddress: customer?.emailAddress || '',
            contactNo: customer?.contactNo || '',
            lastName: customer?.lastName || '',
            specialDate: customer?.dob || '',
            gender: customer?.gender || '',
            entityId: customerEntityId,
            idNumber: customerEntityId,
            businessId: customerEntityId,
            programType: 'LQFLEET115_VC',
            kycStatus: 'MIN_KYC',
            business: 'LQFLEET115_VC',
            businessType: 'LQFLEET115_VC',
            profileId: 'VC4',
            tagId: 'VC4',
            fleetAddField: {
              ...prev.fleetAddField,
              entityId: customerEntityId,
              customerType: 'Individual Customer',
              registrationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
              isCommercial: 'false'
            }
          }));
        }
      } catch (error) {
        console.error("Error retrieving customer:", error);
      }
    };
  
    getCustomer();
  }, []);
  
  
  

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFleetFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      fleetAddField: {
        ...prev.fleetAddField,
        [name]: value,
      },
    }));
  };

  const handleDocumentChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      documents: [
        {
          ...prev.documents[0],
          [name]: value,
        },
      ],
    }));
  };

  const postRequest = async () => {
    if (!formData.contactNo || !formData.idNumber || !formData.vrn) {
      Alert.alert('Missing Fields', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        contactNo: formData.contactNo.replace(/^(\+91|91)/, '+91'),
        fleetAddField: { ...formData.fleetAddField },
        documents: [...formData.documents],
      };

      const response = await axios.post(
        `http://192.168.11.102:8500/api/customer/vehicle-registration`,
        payload
      );

      console.log("response vehivle",response)
      Alert.alert('Success', `Customer Registered!\nEntity ID: ${payload.entityId}`);
    } catch (error) {
      const errData = error.response?.data;
      const detailMessage = errData?.error?.exception?.detailMessage;

      Alert.alert('Error', detailMessage || errData?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Customer Type</Text>
        <TextInput
          style={styles.input}
          value={formData.fleetAddField.customerType}
          onChangeText={(value) => handleFleetFieldChange('customerType', value)}
        />

        <Text style={styles.label}>Registration Date</Text>
        <TextInput
          style={styles.input}
          value={formData.fleetAddField.registrationDate}
          onChangeText={(value) => handleFleetFieldChange('registrationDate', value)}
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          value={formData.color}
          onChangeText={(value) => handleChange('color', value)}
        />

        <Text style={styles.label}>Kit No</Text>
        <TextInput
          style={styles.input}
          value={formData.kitNo}
          onChangeText={(value) => handleChange('kitNo', value)}
        />

        <Text style={styles.label}>Com Vehicle</Text>
        <TextInput
          style={styles.input}
          value={formData.comVehicle}
          onChangeText={(value) => handleChange('comVehicle', value)}
        />

        <Text style={styles.label}>Vehicle Registration Number</Text>
        <TextInput
          style={styles.input}
          value={formData.vrn}
          onChangeText={(value) => handleChange('vrn', value)}
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

        <Text style={styles.label}>National Permit</Text>
        <TextInput
          style={styles.input}
          value={formData.nationalPermit}
          onChangeText={(value) => handleChange('nationalPermit', value)}
        />

        <Text style={styles.label}>Registered Vehicle</Text>
        <TextInput
          style={styles.input}
          value={formData.registeredVehicle}
          onChangeText={(value) => handleChange('registeredVehicle', value)}
        />

        <Text style={styles.label}>Vehicle Descriptor</Text>
        <TextInput
          style={styles.input}
          value={formData.vehicleDescriptor}
          onChangeText={(value) => handleChange('vehicleDescriptor', value)}
        />

        <Text style={styles.label}>National Permit Date</Text>
        <TextInput
          style={styles.input}
          value={formData.nationalPermitDate}
          onChangeText={(value) => handleChange('nationalPermitDate', value)}
        />

        <Text style={styles.label}>Document Expiry</Text>
        <TextInput
          style={styles.input}
          value={formData.documents[0].docExpDate}
          onChangeText={(value) => handleDocumentChange('docExpDate', value)}
        />

        <Text style={styles.label}>Document Type</Text>
        <TextInput
          style={styles.input}
          value={formData.documents[0].docType}
          onChangeText={(value) => handleDocumentChange('docType', value)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={postRequest}>
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: 'darkred',
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
