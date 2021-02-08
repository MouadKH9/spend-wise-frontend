import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import {NavigationProps} from '../../../navigation/MainStack';
import {login} from '../../../services/auth.service';

type Props = NavigationProps;

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Login({navigation}: Props) {
  const goSignup = () => {
    navigation.navigate('Signup');
  };

  const onLogin = async (email: string, password: string) => {
    const success = await login({email, password});
    if (success) Alert.alert('Success!');
    else Alert.alert('Ehhhh');
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={({email, password}) => onLogin(email, password)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <Container>
          <Header style={styles.header}>Log In</Header>

          <View style={styles.form}>
            <Input
              placeholder="E-mail"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              errorMessage={touched.email ? errors.email : ''}
            />
            <Input
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              errorMessage={touched.password ? errors.password : ''}
            />
          </View>

          <View style={styles.footer}>
            <Button title="Log In" onPress={handleSubmit} disabled={!isValid} />
            <Button
              title="No account? Sign up!"
              type="clear"
              onPress={goSignup}
            />
          </View>
        </Container>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  header: {marginTop: 30, flex: 0.1},
  form: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 0.8,
  },
  footer: {
    flex: 0.1,
    paddingHorizontal: 50,
  },
});
