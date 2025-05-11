import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Production_URL } from '../../apiservice/api';
import useAuth from '../../hooks/useAuth';
import FastTagPaymentModal from './FastTagPaymentModal';
import { Picker } from '@react-native-picker/picker';
export default function VehicleRegistration({ navigation }) {
   const {user} = useAuth();
   const [subData, setSubData] = useState([]);
   const [visible, setVisible] = useState(false);
   const [Balance,  setBalance] = useState()
   

   console.log("subData0-----",subData)

   console.log("userrr",user)
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [formData, setFormData] = useState({
    idExpiry: '2021-01-28',
    pincode: '123455',
    country: 'In',
    state: '',
    city: '',
    address2: null,
    address: '',
    emailAddress: 'test@example.com',
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
    idType: null,
    idNumber: '',
    entityType: 'TRUCK_CORPORATE',
    color: '#609',
    kitNo: '',
    profileId: '',
    tagId: '',
    entityId: '',
    comVehicle: 'T',
    engineNo: 'K14MP1346185',
    vin: '78578544',
    vrn:'',
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
          fetchWalletDetails();
      }, []);
  
      const fetchWalletDetails = async () => {
          try {
              const response = await axios.get(`https://api.aktollpark.com/wallet-details/${user.id}`);
              setBalance(response.data.balance);
            
          } catch (error) {
              console.error("Error fetching wallet details:", error);
              Alert.alert("Error", "Failed to load wallet details.");
          }
      };

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
            parentEntityId: customerEntityId,
            entityId: customer?.carNumber,
            idNumber:customer?.carNumber,
            businessId: customer?.carNumber,
            vrn:customer?.carNumber,
            programType: 'LQFLEET115_VC',
            kycStatus: 'MIN_KYC',
            business: 'LQFLEET115_VC',
            businessType: 'LQFLEET115_VC',
            profileId: 'VC4',
            tagId: 'VC4',
            fleetAddField: {
              ...prev.fleetAddField,
              entityId: customer?.carNumber,
              customerType: 'Individual Customer',
              registrationDate: new Date().toISOString().split('T')[0], 
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
  const [KitData, setKitData] = useState([]);
const [tagClass, setTagClass] = useState('');
useEffect(() => {
  if (tagClass) fetchKitNos();
}, [tagClass]);

const fetchKitNos = async () => {
  try {
    const response = await axios.get(`https://api.aktollpark.com/api/tags/agentnotstart/${user.id}?tagClass=${tagClass}`);
    setKitData(response.data); // Assuming response.data is an array of kits
  } catch (error) {
    console.error("Error fetching kit numbers:", error);
    Alert.alert("Error", "Failed to load kit numbers.");
  }
};
  
  

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

  const handleModal =()=>{
    setVisible(true)
  }

  console.log("formData--",formData)
  const postRequest = async () => {
    if (!formData.contactNo || !formData.idNumber || !formData.vrn) {
      Alert.alert('Missing Fields', 'Please fill all required fields');
      return;
    }
console.log("api hitting")
    setLoading(true);

    try {
      const payload = {
        ...formData,
        contactNo: formData.contactNo.replace(/^(\+91|91)/, '+91'),
        fleetAddField: { ...formData.fleetAddField },
        documents: [...formData.documents],
        amount:subData?.fastTagPrice?.total,
        agentId:user?.id,
        type:"Prepaid"
      };

      const response = await axios.post(
        `https://api.aktollpark.com/api/customer/vehicle-registration`,
        payload
      );
      navigation.navigate("UploadKyc")
      console.log("response vehivle",response)
      Alert.alert('Success', `Customer Registered!\nEntity ID: `);
    } catch (error) {
      console.log("error",error.message)
    

      const errData = error.response?.data;
      const detailMessage = errData?.error?.exception?.detailMessage;

      Alert.alert('Error', detailMessage || errData?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

 
  
 const fetchSub = async (adminID, setSubData) => {

  try {
    const { data } = await axios.get(`https://api.aktollpark.com/api/subpartner/Subpartner/${adminID}`);
    setSubData(data?.data || [])
  } catch (error) {
    console.error('Error fetching subpartners:', error);
  }
};

useEffect(() => {
  if (user?.adminID) {
    fetchSub(user.adminID, setSubData);
  }
}, [user?.adminID]);
const mapperOptions = [
  { tagClass: "VC4", mapperClass: "MC4" },
  { tagClass: "VC4", mapperClass: "MC20" },
  { tagClass: "VC5", mapperClass: "MC5" },
  { tagClass: "VC5", mapperClass: "MC9" },
  { tagClass: "VC6", mapperClass: "MC8" },
  { tagClass: "VC6", mapperClass: "MC11" },
  { tagClass: "VC7", mapperClass: "MC7" },
  { tagClass: "VC7", mapperClass: "MC10" },
  { tagClass: "VC12", mapperClass: "MC12" },
  { tagClass: "VC12", mapperClass: "MC13" },
  { tagClass: "VC15", mapperClass: "MC14" },
  { tagClass: "VC15", mapperClass: "MC15" },
  { tagClass: "VC16", mapperClass: "MC16" },
  { tagClass: "VC16", mapperClass: "MC17" },
];
  
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

<Text style={styles.label}>Tag Class</Text>
    <Picker
     selectedValue={tagClass}
     onValueChange={(value) => setTagClass(value)}
      style={styles.input}
    >
      <Picker.Item label="Select Tag Class" value="" />
    
        <Picker.Item  label="VC4" value="VC4" />
        <Picker.Item  label="VC5" value="VC5" />

        <Picker.Item  label="VC6" value="VC6" />

        <Picker.Item  label="VC7" value="VC7" />

        <Picker.Item  label="VC12" value="VC12" />

        <Picker.Item  label="VC15" value="VC15" />

        <Picker.Item  label="VC16" value="VC16" />

     
    </Picker>
<Text style={styles.label}>Kit No</Text>
    <Picker
      selectedValue={formData.kitNo}
      onValueChange={(value) => handleChange('kitNo', value)}
      style={styles.input}
    >
      <Picker.Item label="Select Kit No" value="" />
      {KitData.map((kit, index) => (
        <Picker.Item key={index} label={kit.kitNo} value={kit.kitNo} />
      ))}
    </Picker>

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

        <TouchableOpacity style={styles.submitButton} onPress={handleModal}>
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <FastTagPaymentModal
  visible={visible}
  setVisible={setVisible}
  subData={subData}
  Balance={Balance}
  onPaymentSuccess={postRequest} 
/>

    
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
