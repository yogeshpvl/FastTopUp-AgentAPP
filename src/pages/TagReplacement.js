import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const TagReplacement = () => {
  const [formData, setFormData] = useState({
    entityId: '',
    oldKitNo: '',
    newKitNo: '',
    contactNo: '',
    emailAddress: '',
    reason: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const postRequest = async () => {
    setLoading(true); // Show loader

    const data = {
      entityId: formData.entityId,
      oldKitNo: formData.oldKitNo,
      newKitNo: formData.newKitNo,
      profileId: 'VC4'
    };

    const headers = {
      'Content-Type': 'application/json',
      'TENANT': 'LQFLEET'
    };

    try {
      const response = await axios.post('https://uat-fleetdrive.m2pfintech.com/core/Yappay/business-entity-manager/replaceTag', data, { headers });
      console.log('Response:', response.data);
      if (response.data.status === 'SUCCESS') {
        alert("Tag Replacement Successful");
      } else {
        alert('Tag Replacement Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Entity Id</Text>
          <TextInput
            style={styles.input}
            value={formData.entityId}
            onChangeText={value => handleChange('entityId', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Old Kit Number</Text>
          <TextInput
            style={styles.input}
            value={formData.oldKitNo}
            onChangeText={value => handleChange('oldKitNo', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Kit Number</Text>
          <TextInput
            style={styles.input}
            value={formData.newKitNo}
            onChangeText={value => handleChange('newKitNo', value)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={postRequest} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Request Tag Replacement</Text>
          )}
        </TouchableOpacity>
      </View>
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
    padding: 15,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "black",
    fontFamily: 'Poppins-Regular', // Poppins Font
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Regular', // Poppins Font
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular', // Poppins Font
  },
});

export default TagReplacement;
