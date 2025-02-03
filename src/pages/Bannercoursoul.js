import React, { useRef, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Production_IMG_URL } from '../apiservice/api';

const { width: viewportWidth } = Dimensions.get('window');

const BannerCarousel = ({ images }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.snapToNext();
      }
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri:`{${Production_IMG_URL}/userbanner/${item}` }} style={styles.image} />
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={images}
      renderItem={renderItem}
      sliderWidth={viewportWidth}
      itemWidth={viewportWidth * 0.9}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 150,
    borderRadius: 10,
  },
});

export default BannerCarousel;
