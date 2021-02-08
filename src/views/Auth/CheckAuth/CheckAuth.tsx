import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Container from '../../../components/Container';
import Spinner from '../../../components/Spinner';
import {NavigationProps} from '../../../navigation/MainStack';
import {isLoggedIn} from '../../../services/auth.service';

export default function CheckAuth({navigation}: NavigationProps) {
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn();
      navigation.navigate(loggedIn ? 'Tabs' : 'Login');
    };

    checkAuth();
  }, [navigation]);
  return (
    <Container style={styles.container}>
      <Spinner />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
});
