import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home'; 
import SignIn from './pages/SignIn';
import BottomTab from './pages/BottomTab';
import TagIssuance from './pages/TagIssuance';
import TagRecharge from './pages/TagRecharge';
import TagReplacement from './pages/TagReplacement';
import Challan from './pages/Challan';
import FAQ from './pages/FAQ';
import SaleReport from './pages/SaleReport';
import useAuth from './hooks/useAuth';
import { ActivityIndicator, Image, View } from 'react-native';
import TagList from './pages/TagList';
import Stepper from './pages/Stepper';

// Create Stack Navigator
const Stack = createStackNavigator();

const Navigation = () => {
  const { user, loading } = useAuth(); // Get user and loading state

  console.log("user0", user)
  // Show loader while checking authentication state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D32F2F" />
        {/* <Image source={require('./assets/logo.jpg')}  style={{width:50,height:50}}/> */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? "BottomTab" : "SignIn"} 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stepper" component={Stepper} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="TagIssuance" component={TagIssuance} options={{ headerShown: true, headerTitle: "Tag Issuance" }} />
        <Stack.Screen name="Tags" component={TagList} options={{ headerShown: true, headerTitle: "Tags assigned" }} />

        <Stack.Screen name="TagRecharge" component={TagRecharge} options={{ headerShown: true, headerTitle: "Tag Recharge" }} />
        <Stack.Screen name="TagReplacement" component={TagReplacement} options={{ headerShown: true, headerTitle: "Tag Replacement" }} />
        <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: true, headerTitle: "FAQ" }} />
        <Stack.Screen name="Report" component={SaleReport} options={{ headerShown: true, headerTitle: "Sale Report" }} />
        <Stack.Screen name="Challan" component={Challan} options={{ headerShown: true, headerTitle: "Challan" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
