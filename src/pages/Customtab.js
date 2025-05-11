import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const handlePress = (route, index) => {
    const isFocused = state.index === index;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
      ReactNativeHapticFeedback.trigger('impactLight');
    }
  };

  // Debug: Log routes and focus state
  console.log('Routes:', state.routes.map((route, index) => ({
    name: route.name,
    isFocused: state.index === index,
  })));

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          let iconName;
          let label;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              label = 'Home';
              break;
            case 'Replace Tag':
              iconName = 'tag-arrow-right';
              label = 'Replace';
              break;
            case 'Tags':
              iconName = 'tag-multiple';
              label = 'Tags';
              break;
            case 'Profile':
              iconName = 'account-circle';
              label = 'Profile';
              break;
            default:
              iconName = 'help-circle';
              label = route.name;
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handlePress(route, index)}
              style={[styles.tab, isFocused ? styles.tabFocused : styles.tabInactive]}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={isFocused ? 30 : 24}
                  color={isFocused ? '#8B0000' : '#333333'}
                />
                <Text
                  style={[
                    styles.label,
                    isFocused ? styles.labelFocused : styles.labelInactive,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 60,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    // Debug: Temporary border to verify rendering
    // borderColor: 'blue',
  },
  tabFocused: {
    backgroundColor: 'rgba(139, 0, 0, 0.3)', // Red tint for active tab
    borderColor: '#8B0000',
  },
  tabInactive: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)', // Gray tint for inactive tabs
    // borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  iconContainer: {
    alignItems: 'center',
    opacity: 1,
    // Debug: Temporary border to verify rendering
    // borderWidth: 1,
    // borderColor: 'green',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  labelFocused: {
    color: '#8B0000',
    fontFamily: 'Poppins-Bold',
  },
  labelInactive: {
    color: '#333333',
  },
});

export default CustomTabBar;