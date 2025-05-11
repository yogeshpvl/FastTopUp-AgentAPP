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

import TagAssign from './pages/TCFLOW/TagAssign';
import Wallet from './pages/Wallet';
import CustomerRegistrationotp from './pages/TCFLOW/Customer-Registration_otp';
import UploadKyc from './pages/TCFLOW/Upload-Kyc';
import VehicleRegistration from './pages/TCFLOW/Vehicle-Registration';
import NETC from './pages/TCFLOW/NETC';
import ForgotPassword from './pages/ForgotPassword';
import BKYCChecker from './pages/TCFLOW/BKYCChecker';

// Create Stack Navigator
const Stack = createStackNavigator();

const Navigation = () => {
  const { user, loading } = useAuth(); 

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
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />

        <Stack.Screen name="Home" component={Home} />
       
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="TagIssuance" component={TagIssuance} options={{ headerShown: true, headerTitle: "Tag Issuance" }} />
        <Stack.Screen name="Tags" component={TagList} options={{ headerShown: false, headerTitle: "Tags assigned" }} />

        <Stack.Screen name="TagRecharge" component={TagRecharge} options={{ headerShown: true, headerTitle: "Tag Recharge" }} />
        <Stack.Screen name="TagReplacement" component={TagReplacement} options={{ headerShown: false, headerTitle: "Tag Replacement" }} />
        <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: true, headerTitle: "FAQ" }} />
        <Stack.Screen name="Report" component={SaleReport} options={{ headerShown: true, headerTitle: "Sale Report" }} />
        <Stack.Screen name="Challan" component={Challan} options={{ headerShown: true, headerTitle: "Challan" }} />

        <Stack.Screen name="wallet" component={Wallet} options={{ headerShown: false, }} />

        <Stack.Screen name="TagAssign" component={TagAssign} options={{ headerShown: true, headerTitle: "Tag Assign" }} />
        <Stack.Screen name="CustomerRegistration" component={CustomerRegistrationotp} options={{ headerShown: true, headerTitle: "Customer Registration With OTP" }} />
        <Stack.Screen name="UploadKyc" component={UploadKyc} options={{ headerShown: true, headerTitle: "Upload kyc" }} />
        <Stack.Screen name="vehiclereg" component={VehicleRegistration} options={{ headerShown: true, headerTitle: "Vehicle Registration" }} />

        <Stack.Screen name="netc" component={NETC} options={{ headerShown: true, headerTitle: "NETC Status Checker" }} />
        <Stack.Screen name="BKYCStatusChecker" component={BKYCChecker} options={{ headerShown: true, headerTitle: "BKYC Status Checker" }} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
