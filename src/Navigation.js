import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home'; // Ensure the path to Home is correct
import SignIn from './pages/SignIn';
import BottomTab from './pages/BottomTab';
import TagIssuance from './pages/TagIssuance';
import TagRecharge from './pages/TagRecharge';
import TagReplacement from './pages/TagReplacement';
import Challan from './pages/Challan';
import FAQ from './pages/FAQ';
import SaleReport from './pages/SaleReport';

// Create Stack Navigator
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false, // Hide default headers (optional)
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Welcome' }} // Optional title customization
        />

<Stack.Screen 
          name="TagIssuance" 
          component={TagIssuance} 
          options={{  headerShown: true ,headerTitle:"Tag Issuance"}} 

        />

<Stack.Screen 
          name="TagRecharge" 
          component={TagRecharge} 
          options={{  headerShown: true ,headerTitle:"Tag Recharge"}} 

        />
        
<Stack.Screen 
          name="TagReplacement"  
          component={TagReplacement } 
          options={{  headerShown: true ,headerTitle:"Tag Replacement"}} 
        />
        <Stack.Screen 
          name="FAQ"  
          component={FAQ } 
          options={{  headerShown: true ,headerTitle:"FAQ"}}  
        />
            <Stack.Screen 
          name="Report"  
          component={SaleReport } 
          options={{  headerShown: true ,headerTitle:"Sale Report"}}  
        />
        
<Stack.Screen 
          name="Challan" 
          component={Challan} 
          options={{  headerShown: true ,headerTitle:"Challan"}} 

        />








                <Stack.Screen 
          name="BottomTab" 
          component={BottomTab} 
          options={{ title: 'BottomTab' }} // Optional title customization
        />
          <Stack.Screen 
          name="SignIn"  
          component={SignIn} 
          options={{ title: 'Welcome' }} // Optional title customization
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
