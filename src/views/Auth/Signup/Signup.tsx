import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import {NavigationProps} from '../../../navigation/MainStack';
import {signup} from '../../../services/auth.service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

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
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [step, setStep] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');

  const goLogin = () => {
    navigation.navigate('Login');
  };

  const onSignup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (!accountName || !accountBalance || isNaN(accountBalance)) {
      return;
    }
    setLoading(true);
    const success = await signup({
      firstName,
      lastName,
      email,
      password,
      accountName,
      accountBalance: Number.parseInt(accountBalance, 10),
    });
    if (success) {
      navigation.navigate('Tabs');
    } else {
      setIncorrect(true);
    }
    setLoading(false);
  };

  return (
    <Formik
      validationSchema={signupValidationSchema}
      initialValues={{
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: '3min3m99',
      }}
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
          <View
            style={[
              styles.header,
              step === 0 ? {justifyContent: 'center'} : {},
            ]}>
            {step > 0 && (
              <TouchableOpacity onPress={() => setStep(step - 1)}>
                <Icon name="arrow-left" size={30} />
              </TouchableOpacity>
            )}
            <Header>Sign Up</Header>
            {step > 0 && <View style={{width: 30}} />}
          </View>

          <View style={styles.form}>
            {step === 0 ? (
              <>
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
              </>
            ) : (
              <>
                <Text style={styles.indicationText}>
                  You need a default account to finish creating your account
                </Text>
                <Input
                  placeholder="Default Account"
                  value={accountName}
                  onChangeText={setAccountName}
                />
                <Input
                  placeholder="Initial balance"
                  value={accountBalance}
                  onChangeText={setAccountBalance}
                />
              </>
            )}
          </View>

          <View style={styles.footer}>
            {incorrect && (
              <Text style={styles.error}>E-mail already exists!</Text>
            )}
            <Button
              title={step === 0 ? 'Continue' : 'Sign up'}
              onPress={handleSubmit}
              disabled={!isValid}
              loading={loading}
            />
            {step === 0 && (
              <Button
                title="Already have an account? Log In!"
                type="clear"
                onPress={goLogin}
              />
            )}
          </View>
        </Container>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
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
  indicationText: {
    fontSize: 16,
    marginBottom: 40,
  },
});
