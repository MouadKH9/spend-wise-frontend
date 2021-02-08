import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import {NavigationProps} from '../../../navigation/MainStack';
import {signup} from '../../../services/auth.service';

type Props = NavigationProps;

const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is Required'),
  lastName: yup.string().required('First name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Signup({navigation}: Props) {
  const goLogin = () => {
    navigation.navigate('Login');
  };

  const onSignup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const success = await signup({firstName, lastName, email, password});
    if (success) Alert.alert('Success!');
    else Alert.alert('Ehhhh');
  };

  return (
    <Formik
      validationSchema={signupValidationSchema}
      initialValues={{firstName: '', lastName: '', email: '', password: ''}}
      onSubmit={({firstName, lastName, email, password}) =>
        onSignup(firstName, lastName, email, password)
      }>
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
          <Header style={styles.header}>Sign Up</Header>

          <View style={styles.form}>
            <Input
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              errorMessage={touched.firstName ? errors.firstName : ''}
            />
            <Input
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              errorMessage={touched.lastName ? errors.lastName : ''}
            />
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
            <Button
              title="Sign up"
              onPress={handleSubmit}
              disabled={!isValid}
            />
            <Button
              title="Already have an account? Log In!"
              type="clear"
              onPress={goLogin}
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
