import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Linking,
  StatusBar,
  Alert, // Import Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../hooks/useAuth';
import Bannercoursoul from './Bannercoursoul';

const Home = ({ navigation }) => {
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  const [refreshing, setRefreshing] = useState(false);

  // Fetch latest data
  const fetchData = async () => {
    setRefreshing(true);
    try {
      console.log('Refreshing data...');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating delay
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle BKYC button click
  const handleBKYC = () => {
    Alert.alert(
      'BKYC Options',
      'Please choose an option:',
      [
        {
          text: 'Status Checker',
          onPress: () => {
            // Navigate to Status Checker screen (replace with your actual route)
            navigation.navigate('BKYCStatusChecker'); // Ensure you have a 'StatusChecker' screen in your navigation stack
          },
        },
        {
          text: 'Proceed BKYC',
          onPress: () => {
            // Redirect to external link
            Linking.openURL('https://getkyc-fasttag.livquik.com/');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
    >
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userID}>{user?.id?.slice(15)}</Text>
        </View>
        <TouchableOpacity
          style={styles.balanceContainer}
          onPress={() => navigation.navigate('wallet')}
        >
          <Icon name="wallet-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <Bannercoursoul />

      <View>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            color: 'black',
            paddingLeft: 15,
            marginTop: 10,
          }}
        >
          FAST TOPUP EASY AND FAST
        </Text>
      </View>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TagAssign')}
        >
          <Icon name="credit-card-plus-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>TAG ISSUANCE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('UploadKyc')}
        >
          <Icon name="file-upload-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>UPLOAD KVV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('netc')}
        >
          <Icon name="check-circle-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>NETC CHECKER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={handleBKYC} // Call the handleBKYC function
        >
          <Icon name="bank-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>BKYC</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
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
    marginRight: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginTop: 10,
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
    textAlign: 'center',
  },
});

export default Home;