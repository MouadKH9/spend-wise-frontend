import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, withTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import Item from '../../components/Item';

function Activity() {
  const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
    },
    content: {
      paddingHorizontal: 30,
      marginTop: 30,
    },
  });
  return (
    <Container>
      <View style={styles.headerContainer}>
        <Text h2>Activity</Text>
        <Button type="clear" icon={<Icon name="filter" size={30} />} />
      </View>
      <View style={styles.content}>
        <Divider text="Today - 06/02/2021" />
        <Item />
      </View>
    </Container>
  );
}

export default withTheme(Activity);
