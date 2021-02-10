import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import MainStack from './src/navigation/MainStack';
import {Theme, ThemeProvider} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Feather';

const theme: Partial<Theme> = {
  colors: {
    primary: '#5DB075',
    white: '#fffff',
    grey0: '#999999',
  },
};

const App = () => {
  const actions = [
    {
      text: 'Add record',
      name: 'add_record',
      position: 1,
      color: theme.colors?.primary,
      icon: require('./src/assets/img/edit.png'),
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <MainStack />
      <FloatingAction
        actions={actions}
        color={theme.colors?.primary}
        distanceToEdge={{
          vertical: 100,
          horizontal: 20,
        }}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
        }}
      />
    </ThemeProvider>
  );
};

export default App;
