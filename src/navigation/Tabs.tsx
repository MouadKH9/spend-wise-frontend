import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../views/Home/Home';
import {StyleSheet, View} from 'react-native';
import Spinner from '../components/Spinner';
import {User} from '../types/user';
import {getUser} from '../services/auth.service';
import Profile from '../views/Profile/Profile';
import Icon from 'react-native-vector-icons/Feather';
import {Theme, withTheme} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const AuthContext = React.createContext<User | null>(null);

function Tabs({theme}: {theme: Theme}) {
  const [user, setUser] = useState<User | null>({});
  // useEffect(() => {
  //   if (!user) {
  //     const getUserProfile = async () => {
  //       const newUser = await getUser();
  //       setUser(newUser);
  //     };
  //     getUserProfile();
  //   }
  // }, [user]);
  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Tab.Navigator tabBarOptions={{activeTintColor: theme.colors.primary}}>
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
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
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
