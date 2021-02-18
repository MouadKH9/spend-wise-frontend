/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Container from '../../components/Container';
import {navigate} from '../../navigation/RootNavigation';

type OwnProps = {
  theme: Theme;
};
function Settings({theme}: OwnProps) {
  const settings = [
    {
      title: 'Edit Profile',
      icon: 'user',
      onPress: () => navigate('EditProfile'),
    },
    {
      title: 'Manage accounts',
      icon: 'dollar-sign',
      onPress: () =>
        navigate('ManageEntity', {
          title: 'Accounts',
          entity: 'account',
        }),
    },
    // {
    //   title: 'Manage categories',
    //   icon: 'list',
    //   navigateTo: 'EditCategories',
    // },
  ];

  return (
    <Container style={{paddingTop: 20, paddingHorizontal: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="settings" size={30} />
        <Text h3 style={{marginLeft: 20}}>
          Settings
        </Text>
      </View>
      <View
        style={{
          marginTop: 50,
          flex: 1,
        }}>
        {settings.map(({title, icon, onPress}) => (
          <TouchableOpacity
            onPress={onPress}
            style={{
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 13,
              paddingBottom: 13,
              backgroundColor: theme.colors?.primary,
              marginBottom: 20,
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon name={icon} size={24} color="white" />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  color: 'white',
                }}>
                {title}
              </Text>
            </View>
            <Icon name="chevron-right" color="white" size={24} />
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
}

export default withTheme(Settings);
