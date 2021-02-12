import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';
import {Record} from '../types/types';

type OwnProps = {
  record: Record;
  theme: Theme;
  showBorder: boolean;
};
function Item({record, theme, showBorder}: OwnProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderTopWidth: showBorder ? 0.3 : 0,
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
          source={
            record.category?.icon
              ? {
                  uri: record.category?.icon,
                }
              : require('../assets/img/file.png')
          }
          style={styles.image}
        />
        <Text style={styles.name}>{record.description}</Text>
      </View>
      <Text style={styles.amount}>
        {record.category?.type > 0 ? '+' : '-'} {record.amount} MAD
      </Text>
    </View>
  );
}

export default withTheme(Item);
