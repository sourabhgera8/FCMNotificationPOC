import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './apps/screens/SplashScreen';

const Stack = createNativeStackNavigator();
  
  function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">

          <Stack.Screen  options={{headerShown: false}}  
          name="SplashScreen" component={SplashScreen} />
         

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Routes;