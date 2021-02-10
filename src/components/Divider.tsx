import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

type OwnProps = {
  text?: string;
};
export default function Divider({text}: OwnProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text && (
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  line: {flex: 1, height: 1, backgroundColor: '#999999'},
  text: {
    textAlign: 'center',
    color: '#999999',
    marginHorizontal: 20,
    fontSize: 17,
  },
});
