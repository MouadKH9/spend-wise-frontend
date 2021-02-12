import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';
import {User} from '../../types/types';

type OwnProps = {
  theme: Theme;
  user: User;
};
function UserInfo({theme, user}: OwnProps) {
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 30,
      borderRadius: 20,
      borderColor: '#E8E8E8',
      borderWidth: 1,
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    text: {fontSize: 17},
    label: {fontWeight: '500'},
  });
  const renderRow = (label: string, value?: string) => (
    <View style={styles.row}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      <Text style={[styles.text]}>{value}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderRow('First Name:', user.firstName)}
      {renderRow('Last Name:', user.lastName)}
      {renderRow('E-mail:', user.email)}
    </View>
  );
}

export default withTheme(UserInfo);
