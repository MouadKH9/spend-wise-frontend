import React from 'react';
import {StyleSheet, View} from 'react-native';
import Container from '../../components/Container';

export default function Profile() {
  return (
    <Container>
      <View style={styles.header}></View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    backgroundColor: '#5DB075',
  },
});
