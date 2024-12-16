import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with user photo URL
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>ShriRaam NIKAM</Text>
          <Text style={styles.userID}>ID: 1611533</Text>
          <Text style={styles.lastLogin}>Last Login: 2024-06-07 10:30 AM</Text>
        </View>
      </View>

      {/* Options List */}
      <ScrollView style={styles.optionsContainer}>
        <OptionItem icon="credit-card-plus-outline" text="Tag Issuance" onPress={() => navigation.navigate('TagIssuance')} />
        <OptionItem icon="credit-card-check-outline" text="Request For Tag" onPress={() => navigation.navigate('RequestForTag')} />
        <OptionItem icon="chart-bar" text="Sales Report" onPress={() => navigation.navigate('Report')} />
        <OptionItem icon="credit-card-remove-outline" text="Tag Replacement" onPress={() => navigation.navigate('TagReplacement')} />
        <OptionItem icon="help-circle-outline" text="FAQ" onPress={() => navigation.navigate('FAQ')} />
        <OptionItem icon="logout" text="Logout" color="#8B0000" onPress={() => navigation.navigate('SignIn')} />
      </ScrollView>
    </View>
  );
};

// Reusable Option Component
const OptionItem = ({ icon, text, color = '#333', onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Icon name={icon} size={28} color={color} style={styles.icon} />
    <Text style={[styles.optionText, { color }]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#8B0000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userID: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  lastLogin: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Settings;
