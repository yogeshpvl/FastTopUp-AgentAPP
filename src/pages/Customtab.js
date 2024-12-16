import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 2; // Adjust for the number of tabs

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          let iconComponent;
          let label;

          switch (route.name) {
            case 'Home':
              iconComponent = (
                <MaterialCommunityIcons
                  name="home"
                  size={25}
                  color={isFocused ? 'darkred' : '#757575'}
                />
              );
              label = 'Home';
              break;
            case 'Settings':
              iconComponent = (
                <MaterialCommunityIcons
                  name="cogs" // Changed icon name to 'cogs' for settings
                  size={25}
                  color={isFocused ? 'darkred' : '#757575'}
                />
              );
              label = 'Settings';
              break;
            default:
              iconComponent = (
                <MaterialCommunityIcons
                  name="settings"
                  size={25}
                  color={isFocused ? 'darkred' : '#757575'}
                />
              );
              label = route.name;
              break;
          }

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={handlePress}
              style={styles.tab}>
              <View style={styles.iconAndText}>
                {iconComponent}
                <Text style={[styles.label, isFocused && styles.labelFocused]}>
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
    backgroundColor: 'white',
    height: 60,
    elevation: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAndText: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
    fontFamily: 'Poppins-Medium',
  },
  labelFocused: {
    color: 'darkred',
    fontWeight: 'bold',
  },
});

export default CustomTabBar;
