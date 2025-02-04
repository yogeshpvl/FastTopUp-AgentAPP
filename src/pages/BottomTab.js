import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home';

import CustomTabBar from './Customtab';


import Settings from './Settings';
import TagReplacement from './TagReplacement';
import TagList from './TagList';

const Tab = createBottomTabNavigator();

function BottomTab({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Tags" component={TagList} options={{headerShown: false}} />

      <Tab.Screen name="Tag Replace" component={TagReplacement} options={{headerShown: false}} />
      
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;