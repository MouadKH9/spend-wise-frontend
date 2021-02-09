import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
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
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const goSignup = () => {
    navigation.navigate('Signup');
  };

  const onLogin = async (email: string, password: string) => {
    setLoading(true);
    const success = await login({email, password});
    if (success) {
      navigation.navigate('Tabs');
    } else {
      setIncorrect(true);
    }
    setLoading(false);
  };

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: 'mouad.khchich@gmail.com', password: '3min3m99'}}
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
            {incorrect && (
              <Text style={styles.error}>Incorrect e-mail or password</Text>
            )}
            <Button
              title="Log In"
              onPress={handleSubmit}
              disabled={!isValid}
              loading={loading}
            />
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
    flex: 0.13,
    paddingHorizontal: 50,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
});
