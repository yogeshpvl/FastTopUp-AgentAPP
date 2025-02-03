import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuth from '../hooks/useAuth';
import { Production_URL } from '../apiservice/api';
import axios from 'axios';


const Home = ({navigation}) => {

  const { user, token } = useAuth();
  console.log("User:", user);
  console.log("Token:", token);
  const [banners, setBanners] = React.useState([]);



  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(Production_URL+"/banner/getallbanner");
      console.log("Response--", response.data)
      setBanners(response.data.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };


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
          {/* <Text style={styles.balanceText}>Balance(₹)</Text>
          <Text style={styles.balanceAmount}>₹ 10,291</Text> */}
        </View>
      </View>
      <View>
        <Image source={{uri:""}} style={{width:"90%",height:150,justifyContent:"center",alignContent:"center",alignSelf:"center",marginTop:10,borderRadius:10}}/>
      </View>
      {/* Available Inventory Button */}
      {/* <TouchableOpacity style={styles.inventoryButton}>
        <Text style={styles.inventoryText}>AVAILABLE INVENTORY</Text>
      </TouchableOpacity> */}

      {/* Card Section */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("TagIssuance")}>
          <Icon name="credit-card-plus-outline" size={40} color="#8B0000" />
          <Text style={styles.cardText}>TAG ISSUANCE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("TagRecharge")}>
          <Icon name="credit-card-refresh-outline" size={40} color="#8B0000" />
          <Text style={styles.cardText}>TAG RECHARGE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("TagReplacement")}>
          <Icon name="credit-card-remove-outline" size={40} color="#8B0000" />
          <Text style={styles.cardText}>TAG REPLACEMENT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Challan")}>
          <Icon name="file-document-outline" size={40} color="#8B0000" />
          <Text style={styles.cardText}>CHALLAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    width: 50,
    height: 50,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userID: {
    fontSize: 14,
    color: '#fff',
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 14,
    color: '#fff',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  inventoryButton: {
    backgroundColor: '#8B0000',
    margin: 20,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 3,
  },
  inventoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    width: '40%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default Home;
