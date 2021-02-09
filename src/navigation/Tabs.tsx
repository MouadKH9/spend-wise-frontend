import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../views/Home/Home';
import {StyleSheet, View} from 'react-native';
import Spinner from '../components/Spinner';
import {User} from '../types/user';
import {getUser} from '../services/auth.service';

const Tab = createBottomTabNavigator();
const AuthContext = React.createContext<User | null>(null);

export default function Tabs() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!user) {
      const getUserProfile = async () => {
        const newUser = await getUser();
        setUser(newUser);
      };
      getUserProfile();
    }
  }, [user]);
  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
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
