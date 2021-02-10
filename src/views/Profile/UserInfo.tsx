import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Container from '../../components/Container';
import Switcher from '../../components/Switcher';

type OwnProps = {
  theme: Theme;
};
function UserInfo({theme}: OwnProps) {
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
  const renderRow = (label: string, value: string) => (
    <View style={styles.row}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      <Text style={[styles.text]}>{value}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderRow('First Name:', 'Mouad')}
      {renderRow('Last Name:', 'Khchich')}
      {renderRow('E-mail:', 'mouad.khchich@gmail.com')}
    </View>
  );
}

export default withTheme(UserInfo);
