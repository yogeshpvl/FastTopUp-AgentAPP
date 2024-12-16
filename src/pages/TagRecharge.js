import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TagRecharge = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      
      {/* Tag Recharge Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Tag ID"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Recharge Amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recharge Tag</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default TagRecharge;
