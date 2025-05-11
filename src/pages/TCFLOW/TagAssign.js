import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, Modal } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomInput = ({ icon, placeholder, value, onChangeText, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={icon} size={24} color="grey" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};



const TagAssign = ({navigation}) => {
  const [carNumber, setCarNumber] = useState('TN72AR08110');
  const [mobileNumber, setMobileNumber] = useState('');
  const [panNumber, setPanNumber] = useState('CNEPP0116R');
const [loader, setloader]=useState(false)
  

  const fetchCarDetails = async () => {
    if (!carNumber || !mobileNumber || !panNumber) {
      return Alert.alert('Validation Error', 'Please fill in all fields.');
    }

    setloader(true)
    try {
      const res = await axios.post(
        'https://api.aktollpark.com/api/customer/register',
        {
          carNumber: carNumber,
          customerNumber: mobileNumber,
          panNumber: panNumber
        }
      );

      const data = res.data;
      console.log('Fetched Info:', data);
      await AsyncStorage.setItem("address", JSON.stringify(res.data.panAddress?.address));
      await AsyncStorage.setItem("pandetails", JSON.stringify(res.data.panAddress));
      await AsyncStorage.setItem("customer", JSON.stringify(res.data.customer));

if(data.status === "CUSTOMER REGISTERED"){
  navigation.navigate("vehiclereg");

}else{
  navigation.navigate("CustomerRegistration");

}
      
      Alert.alert('Success', 'Data Fetched Successfully!');
    

    } catch (err) {
      console.error('API error:', err);
  navigation.navigate("CustomerRegistration");

      Alert.alert('Error', 'Failed to fetch vehicle info.');
    }finally{
      setloader(false)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Car Number</Text>
      <CustomInput 
        icon="directions-car" 
        placeholder="Enter Car Number" 
        value={carNumber} 
        onChangeText={setCarNumber} 
      />
      
      <Text style={styles.heading}>Customer Information</Text>
      <CustomInput 
        icon="phone" 
        placeholder="Mobile Number" 
        keyboardType="phone-pad" 
        value={mobileNumber} 
        onChangeText={setMobileNumber} 
      />
      <CustomInput 
        icon="credit-card" 
        placeholder="PAN Number" 
        value={panNumber} 
        onChangeText={setPanNumber} 
      />

<Button mode="contained" style={styles.button} onPress={fetchCarDetails} disabled={loader}>
  {loader ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    'Proceed'
  )}
</Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'darkred',
  },
});

export default TagAssign;
