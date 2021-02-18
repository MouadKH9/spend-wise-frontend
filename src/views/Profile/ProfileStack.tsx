import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import Settings from './Settings';
import ManageEntity from './ManageEntity/ManageEntity';
import EditProfile from './EditProfile/EditProfile';

const Stack = createStackNavigator();

export type NavigationProps = {
  navigation: {
    navigate: (path: string) => void;
    goBack: () => void;
  };
  route: {
    params: any;
  };
};

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ManageEntity" component={ManageEntity} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}
