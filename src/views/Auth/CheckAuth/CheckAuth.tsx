import React from 'react';
import {StyleSheet} from 'react-native';
import Container from '../../../components/Container';
import Spinner from '../../../components/Spinner';
import {NavigationProps} from '../../../navigation/MainStack';

export default function CheckAuth({navigation}: NavigationProps) {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 3000);
  return (
    <Container style={styles.container}>
      <Spinner />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
});
