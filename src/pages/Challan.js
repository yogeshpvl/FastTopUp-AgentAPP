import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Challan = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    

      {/* Challan Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Challan Number"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Number"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Date of Issue"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Challan Issuer"
          placeholderTextColor="#888"
        />
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit Challan Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular', // Poppins Font
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
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

export default Challan;
