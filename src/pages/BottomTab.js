import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import CustomTabBar from './Customtab';
import Settings from './Settings';
import TagReplacement from './TagReplacement';
import TagList from './TagList';

const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Replace Tag" component={TagReplacement} />
      <Tab.Screen name="Tags" component={TagList} />
      <Tab.Screen name="Profile" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTab;