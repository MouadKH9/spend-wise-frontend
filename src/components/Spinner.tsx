import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Theme, withTheme} from 'react-native-elements';

function Spinner({
  color,
  size,
  theme,
}: {
  theme: Theme;
  color?: string;
  size?: string;
}) {
  return (
    <ActivityIndicator
      size={size || 'large'}
      color={color || theme.colors?.primary}
    />
  );
}

export default withTheme(Spinner);
