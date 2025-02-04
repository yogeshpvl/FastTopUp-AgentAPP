import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

export default function Vehicle() {
  const [formData, setFormData] = useState({
    color: "#609",
    kitNo: "654001-200-0000060",
    profileId: "VC4",
    tagId: "VC4",
    entityId: "KL2CBC4201",
    comVehicle: "T",
    engineNo: "K14MP1346185",
    vin: "78578544",
    vrn: "KL2CBC4201",
    stateCode: "In",
    nationalPermit: "T",
    registeredVehicle: "F",
    vehicleDescriptor: "PETROL",
    nationalPermitDate: "12-01-2025",
  });

  // Function to handle input change
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Function to submit data
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://your-api-endpoint.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      Alert.alert("Success", "Data submitted successfully!");
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Vehicle Details</Text>

        {/* Input fields for each value */}
        <Text style={styles.label}>Color</Text>
        <TextInput style={styles.input} value={formData.color} onChangeText={(text) => handleChange("color", text)} />

        <Text style={styles.label}>Kit No</Text>
        <TextInput style={styles.input} value={formData.kitNo} onChangeText={(text) => handleChange("kitNo", text)} />

        <Text style={styles.label}>Profile ID</Text>
        <TextInput style={styles.input} value={formData.profileId} onChangeText={(text) => handleChange("profileId", text)} />

        <Text style={styles.label}>Tag ID</Text>
        <TextInput style={styles.input} value={formData.tagId} onChangeText={(text) => handleChange("tagId", text)} />

        <Text style={styles.label}>Entity ID</Text>
        <TextInput style={styles.input} value={formData.entityId} onChangeText={(text) => handleChange("entityId", text)} />

        <Text style={styles.label}>Commercial Vehicle</Text>
        <TextInput style={styles.input} value={formData.comVehicle} onChangeText={(text) => handleChange("comVehicle", text)} />

        <Text style={styles.label}>Engine No</Text>
        <TextInput style={styles.input} value={formData.engineNo} onChangeText={(text) => handleChange("engineNo", text)} />

        <Text style={styles.label}>VIN</Text>
        <TextInput style={styles.input} value={formData.vin} onChangeText={(text) => handleChange("vin", text)} />

        <Text style={styles.label}>VRN</Text>
        <TextInput style={styles.input} value={formData.vrn} onChangeText={(text) => handleChange("vrn", text)} />

        <Text style={styles.label}>State Code</Text>
        <TextInput style={styles.input} value={formData.stateCode} onChangeText={(text) => handleChange("stateCode", text)} />

        <Text style={styles.label}>National Permit</Text>
        <TextInput style={styles.input} value={formData.nationalPermit} onChangeText={(text) => handleChange("nationalPermit", text)} />

        <Text style={styles.label}>Registered Vehicle</Text>
        <TextInput style={styles.input} value={formData.registeredVehicle} onChangeText={(text) => handleChange("registeredVehicle", text)} />

        <Text style={styles.label}>Vehicle Descriptor</Text>
        <TextInput style={styles.input} value={formData.vehicleDescriptor} onChangeText={(text) => handleChange("vehicleDescriptor", text)} />

        <Text style={styles.label}>National Permit Date</Text>
        <TextInput style={styles.input} value={formData.nationalPermitDate} onChangeText={(text) => handleChange("nationalPermitDate", text)} />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    margin: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
});

