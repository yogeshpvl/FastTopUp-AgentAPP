import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuth from '../hooks/useAuth';
import Bannercoursoul from './Bannercoursoul';

const Home = ({ navigation }) => {
  const { user, token } = useAuth();
  console.log('User:', user);
  console.log('Token:', token);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.headerImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userID}>{user?.id.slice(15)}</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Balance</Text>
          <Text style={styles.balanceAmount}>₹ 10,291</Text>
        </View>
      </View>

      {/* Banner Section */}
      <Bannercoursoul />

      {/* Card Section */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TagIssuance')}>
          <Icon name="credit-card-plus-outline" size={40} color="#fff" />
          <Text style={styles.cardText}>TAG ISSUANCE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TagRecharge')}>
          <Icon name="credit-card-refresh-outline" size={40} color="#fff" />
          <Text style={styles.cardText}>TAG RECHARGE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TagReplacement')}>
          <Icon name="credit-card-remove-outline" size={40} color="#fff" />
          <Text style={styles.cardText}>TAG REPLACEMENT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Challan')}>
          <Icon name="file-document-outline" size={40} color="#fff" />
          <Text style={styles.cardText}>TAGS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#8B0000',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  userID: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#8B0000',
    borderRadius: 15,
    width: '43%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 5,
  

  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },
});

export default Home;
