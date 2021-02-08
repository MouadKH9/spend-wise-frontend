import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export type ContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
};
export default function Container({children, style}: ContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
