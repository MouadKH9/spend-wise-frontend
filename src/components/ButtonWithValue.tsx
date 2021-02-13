import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ButtonProps, Text, Theme, withTheme} from 'react-native-elements';

type OwnProps = {
  theme: Theme;
  text: string;
  value: string;
  onPress: () => void;
};
function ButtonWithValue({theme, text, value, onPress}: OwnProps) {
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: theme.colors?.primary,
      alignItems: 'center',
      flex: 1,
    },
    miniText: {
      fontSize: 14,
      color: '#D3D3D3',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });

  return (
    <TouchableOpacity style={[styles.button, {flex: 0.46}]} onPress={onPress}>
      <Text style={value ? styles.miniText : styles.text}>{text}</Text>
      {value && <Text style={styles.text}>{value}</Text>}
    </TouchableOpacity>
  );
}

export default withTheme(ButtonWithValue);
