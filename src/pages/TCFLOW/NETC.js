import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NETC = () => {
  const [carNumber, setCarNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [error, setError] = useState(null);

  const validateCarNumber = (number) => {
    const regex = /^[A-Z0-9]{6,12}$/;
    return regex.test(number.trim());
  };

  const fetchVehicleDetails = async () => {
    if (!carNumber.trim()) {
      Alert.alert('Error', 'Please enter a car number.');
      return;
    }

    if (!validateCarNumber(carNumber)) {
      Alert.alert('Error', 'Please enter a valid car number (6-12 alphanumeric characters).');
      return;
    }

    setLoading(true);
    setError(null);
    setVehicleDetails([]);

    try {
      const response = await fetch('https://uat-fleet-netcswitch.m2pfintech.com/web/requestDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          TENANT: 'LQFLEET115',
        },
        body: JSON.stringify({
          searchParam: 'regnum',
          search: carNumber.trim().toUpperCase(),
        }),
      });

      const data = await response.json();

      if (data.result && data.result.vehicleDetails && data.result.vehicleDetails.length > 0) {
        setVehicleDetails(data.result.vehicleDetails);
      } else {
        setError('No vehicle details found for this registration number.');
      }
    } catch (err) {
      setError('Failed to fetch vehicle details. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderVehicleItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="car" size={24} color="#fff" />
        <Text style={styles.cardTitle}>{item.regNumber}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>Tag Status: {item.tagStatus}</Text>
        <Text style={styles.cardText}>Vehicle Class: {item.vehicleClass}</Text>
        <Text style={styles.cardText}>Issue Date: {item.issueDate}</Text>
        <Text style={styles.cardText}>Tag ID: {item.tagId}</Text>
        <Text style={styles.cardText}>Status: {item.status === 'A' ? 'Active' : 'Inactive'}</Text>
        <Text style={styles.cardText}>Commercial: {item.comVehicle === 'T' ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
    
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Car Number (e.g., TN72AR08110)"
          placeholderTextColor="#888"
          value={carNumber}
          onChangeText={setCarNumber}
          autoCapitalize="characters"
          maxLength={12}
        />
        <Button
          title={loading ? 'Checking...' : 'Check NETC'}
          onPress={fetchVehicleDetails}
          color="#8B0000"
          disabled={loading}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#8B0000" style={styles.loader} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {vehicleDetails.length > 0 && (
        <FlatList
          data={vehicleDetails}
          renderItem={renderVehicleItem}
          keyExtractor={(item) => item.tagId}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#8B0000',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  cardContent: {
    marginLeft: 34, // Align with title text
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
});

export default NETC;