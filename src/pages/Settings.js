import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const { user, setUser } = useAuth();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setUser(null); // Clear user in context
      navigation.navigate('SignIn');
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      {/* Header Section */}
      <LinearGradient
        colors={['#8B0000', '#B22222']}
        style={styles.header}
      >
        <Image
          source={require('../assets/whiteP.png')}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userID}>ID: {user?.id?.slice(15) || 'N/A'}</Text>
          <Text style={styles.lastLogin}>{user?.email || 'email@example.com'}</Text>
        </View>
      </LinearGradient>

      {/* Options List */}
      <ScrollView style={styles.optionsContainer}>
        <OptionItem icon="chart-bar" text="Sales Report" onPress={() => navigation.navigate('Report')} />
        <OptionItem icon="credit-card-remove-outline" text="Tag Replacement" onPress={() => navigation.navigate('TagReplacement')} />
        <OptionItem icon="help-circle-outline" text="FAQ" onPress={() => navigation.navigate('FAQ')} />
        <OptionItem icon="logout" text="Logout" color="#8B0000" onPress={logout} />
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  userID: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginTop: 5,
  },
  lastLogin: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#DDDDDD',
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Subtle border instead of shadow
    ...Platform.select({
      android: { elevation: 0 }, // Remove elevation on Android
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
  },
});

export default Settings;