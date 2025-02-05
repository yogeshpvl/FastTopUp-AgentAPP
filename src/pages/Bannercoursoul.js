import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Production_IMG_URL, Production_URL } from '../apiservice/api';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Bannercoursoul = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(Production_URL + '/banner/getallbanner');
      setBanners(response.data.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{  justifyContent: 'center',backgroundColor:"white",height:180 }}>
      {banners.length > 0 ? (
        <Carousel
          loop
          width={width}
          height={200}
          autoPlay={true}
          data={banners}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:20 }}>
              <Image 
                source={{ uri: `${Production_IMG_URL}/userbanner/${item.banner}` }} 
                style={{ width: '90%', height: 150, borderRadius: 10 }} 
              />
            </View>
          )}
        />
      ) : (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Image source={{ uri: 'https://via.placeholder.com/300' }} style={{ width: 300, height: 150 }} />
        </View>
      )}
    </View>
  );
};

export default Bannercoursoul;
