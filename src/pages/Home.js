
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import useAuth from '../hooks/useAuth';
import Bannercoursoul from './Bannercoursoul';

const Home = ({navigation}) => {
  const {user, token} = useAuth();


useEffect(() => {
  if (!user) {
    navigation.replace('Login'); // Redirect to Login if user is not authenticated
  }
}, [user, navigation]);
const [refreshing, setRefreshing] = useState(false);

  // Fetch latest data
  const fetchData = async () => {
    setRefreshing(true);
    try {
      // Simulate API call or fetch latest user data
      console.log('Refreshing data...');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating delay
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
    style={styles.container}
        contentContainerStyle={styles.cardContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }>

<View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userID}>{user?.id.slice(15)}</Text>
        </View>
        <TouchableOpacity style={styles.balanceContainer} onPress={()=>navigation.navigate("wallet")}>
        <AntDesign name="wallet" size={30} color="#fff" />
         
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <Bannercoursoul />

      <View>
        <Text
          style={{fontFamily: 'Poppins-Bold', fontSize: 16, color: 'black', paddingLeft:15,marginTop:10}}>
          FAST TOPUP EASY AND FAST{' '}
        </Text>
      </View>
      {/* Card Section */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TagAssign')}>
          <Icon name="credit-card-plus-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>TAG ISSUANCE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('UploadKyc')}>
          <Icon name="credit-card-refresh-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>Upload kyc</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TagReplacement')}>
          <Icon name="credit-card-remove-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>TAG REPLACEMENT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Tags')}>
          <Icon name="file-document-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>TAGS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
        </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#8B0000',
    padding: 10,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  userID: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:10
  },
  balanceText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  balanceAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop: 0,
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
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },
});

export default Home;
