import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';
import {Record} from '../types/types';

type OwnProps = {
  record: Record;
  theme: Theme;
};
function Item({record, theme}: OwnProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderColor: 'gray',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 35,
      height: 35,
      marginRight: 20,
    },
    name: {
      fontSize: 16,
    },
    amount: {
      fontSize: 16,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{
            uri:
              'https://www.clipartmax.com/png/middle/255-2553169_food-drink-food-logo-black-and-white.png',
          }}
          style={styles.image}
        />
        <Text style={styles.name}>Item 1</Text>
      </View>
      <Text style={styles.amount}>- 12 MAD</Text>
    </View>
  );
}

export default withTheme(Item);
