import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Tabs';
import CheckAuth from '../views/Auth/CheckAuth/CheckAuth';
import Login from '../views/Auth/Login/Login';
import Signup from '../views/Auth/Signup/Signup';
import {navigationRef} from './RootNavigation';
import AddRecord from '../views/AddRecord/AddRecord';

const Stack = createStackNavigator();

export type NavigationProps = {
  navigation: {
    navigate: (path: string) => void;
    goBack: () => void;
  };
};

export default function MainStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="CheckAuth"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="CheckAuth" component={CheckAuth} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="AddRecord" component={AddRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
