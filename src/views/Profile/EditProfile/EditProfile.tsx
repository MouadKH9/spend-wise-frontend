/* eslint-disable react-native/no-inline-styles */
import {Formik} from 'formik';
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, Input, Text, withTheme} from 'react-native-elements';
import * as yup from 'yup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Container from '../../../components/Container';
import {NavigationProps} from '../ProfileStack';
import {updateProfile} from '../../../services/auth.service';
import {navigate} from '../../../navigation/RootNavigation';
import {AuthContext} from '../../../navigation/Tabs';

const profileValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is Required'),
  lastName: yup.string().required('First name is Required'),
});

function EditProfile({navigation}: NavigationProps) {
  const [loading, setLoading] = useState(false);
  const {updateUser} = useContext(AuthContext);

  const onUpdate = async ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    setLoading(true);
    const resp = await updateProfile({firstName, lastName});
    if (resp) {
      await updateUser();
      navigate('Profile');
    }
    setLoading(false);
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} style={{marginRight: 10}} />
        </TouchableOpacity>
        <Text h3>Edit your profile</Text>
      </View>

      <Formik
        validationSchema={profileValidationSchema}
        initialValues={{
          firstName: 'John',
          lastName: 'Doe',
        }}
        onSubmit={({firstName, lastName}) => onUpdate({firstName, lastName})}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <View style={{paddingHorizontal: 20}}>
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

            <Button
              title="Update"
              onPress={handleSubmit}
              disabled={!isValid}
              loading={loading}
              containerStyle={{marginTop: 100}}
            />
          </View>
        )}
      </Formik>
    </Container>
  );
}

export default withTheme(EditProfile);
