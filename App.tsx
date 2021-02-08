import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import MainStack from './src/navigation/MainStack';
import {Theme, ThemeProvider} from 'react-native-elements';

const theme: Partial<Theme> = {
  colors: {
    primary: '#5DB075',
    white: '#fffff',
    grey0: '#999999',
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <MainStack />
    </ThemeProvider>
  );
};

export default App;
