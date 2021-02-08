import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';

export type ContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
};
export default function Container({children, style}: ContainerProps) {
  return (
    <Text style={[styles.text, style]} h2>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {textAlign: 'center'},
});
