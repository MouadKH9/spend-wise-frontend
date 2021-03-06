import React, {useContext, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Container from '../../components/Container';
import Switcher from '../../components/Switcher';
import {navigate} from '../../navigation/RootNavigation';
import {AuthContext} from '../../navigation/Tabs';
import {logout} from '../../services/auth.service';
import {User} from '../../types/types';
import UserInfo from './UserInfo';

type OwnProps = {
  theme: Theme;
};
const tabValues: ('stats' | 'info')[] = ['stats', 'info'];
function Profile({theme}: OwnProps) {
  const [currentTab, setCurrentTab] = useState<'stats' | 'info'>('stats');

  const {user} = useContext(AuthContext);

  const logOut = () => {
    logout();
  };

  return (
    <Container style={{backgroundColor: 'white'}}>
      <View style={styles.header}>
        <View style={styles.headerTitles}>
          <TouchableOpacity onPress={() => navigate('Settings')}>
            <Icon name="settings" color="white" size={30} />
          </TouchableOpacity>
          <Text h3 style={styles.headerTitle}>
            Profile
          </Text>
          <TouchableOpacity onPress={logOut}>
            <Text h4 style={styles.headerTitle}>
              <Icon name="log-out" color="white" size={30} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
              }}
            />
          </View>
          <Text h3>{`${user?.firstName} ${user?.lastName}`}</Text>
        </View>
      </View>
      {/* <Switcher
        firstButton="Statistics"
        secondButton="Info"
        selectedIndex={currentTab === 'stats' ? 0 : 1}
        onChange={(index: number) => setCurrentTab(tabValues[index])}
        style={styles.switcher}
      /> */}
      <View style={{flex: 0.3}}>
        {/* {currentTab === 'info' && <UserInfo user={user as User} />} */}
        <UserInfo user={user as User} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    backgroundColor: '#5DB075',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  headerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
  },
  headerTitle: {color: 'white'},
  avatarContainer: {marginBottom: -100, alignItems: 'center'},
  imgContainer: {
    borderRadius: 100,
    backgroundColor: 'white',
    height: 125,
    width: 125,
    overflow: 'hidden',
  },
  img: {width: '100%', height: '100%'},
  switcher: {marginTop: 30},
});

export default withTheme(Profile);
