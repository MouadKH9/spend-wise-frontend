import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../views/Home/Home';
import {StyleSheet, View} from 'react-native';
import Spinner from '../components/Spinner';
import {User} from '../types/types';
import {getUser} from '../services/auth.service';
import Profile from '../views/Profile/Profile';
import Icon from 'react-native-vector-icons/Feather';
import {Theme, withTheme} from 'react-native-elements';
import Activity from '../views/Activity/Activity';
import {FloatingAction} from 'react-native-floating-action';
import {navigate} from './RootNavigation';
import ProfileStack from '../views/Profile/ProfileStack';

const Tab = createBottomTabNavigator();
export const AuthContext = React.createContext<{
  user: User | null;
  updateUser: () => Promise<void>;
}>({
  user: null,
  updateUser: async () => {},
});

function Tabs({theme}: {theme: Theme}) {
  const [user, setUser] = useState<User | null>(null);
  const actions = [
    {
      text: 'Add record',
      name: 'add_record',
      position: 1,
      color: theme.colors?.primary,
      icon: require('../assets/img/edit.png'),
    },
  ];
  const getUserProfile = async () => {
    const newUser = await getUser();
    setUser(newUser);
  };
  useEffect(() => {
    console.log('🚀 ~ file: Tabs.tsx ~ line 20 ~ useEffect ~ user', user);
    if (!user) {
      getUserProfile();
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{user, updateUser: getUserProfile}}>
      {user ? (
        <>
          <Tab.Navigator
            tabBarOptions={{activeTintColor: theme.colors.primary}}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Activity"
              component={Activity}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="list" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="user" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
          <FloatingAction
            actions={actions}
            color={theme.colors?.primary}
            distanceToEdge={{
              vertical: 100,
              horizontal: 20,
            }}
            onPressItem={() => {
              navigate('AddRecord');
            }}
          />
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Spinner />
        </View>
      )}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default withTheme(Tabs);
