import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text, Theme, withTheme} from 'react-native-elements';

type OwnProps = {
  theme: Theme;
  firstButton: string;
  secondButton: string;
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: ViewStyle;
};
function Switcher({
  theme,
  firstButton,
  secondButton,
  selectedIndex,
  onChange,
  style,
}: OwnProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderColor: '#E8E8E8',
      borderWidth: 1,
      width: '80%',
      alignSelf: 'center',
      borderRadius: 20,
    },
    button: {
      flex: 0.5,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: '#E8E8E8',
    },
    buttonText: {
      color: '#BDBDBD',
      fontSize: 20,
      textAlign: 'center',
    },
    buttonSelected: {
      backgroundColor: 'white',
    },
    buttonTextSelected: {
      color: theme.colors?.primary,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedIndex === 0 ? styles.buttonSelected : {},
        ]}
        onPress={() => onChange(0)}>
        <Text
          style={[
            styles.buttonText,
            selectedIndex === 0 ? styles.buttonTextSelected : {},
          ]}>
          {firstButton}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedIndex === 1 ? styles.buttonSelected : {},
        ]}
        onPress={() => onChange(1)}>
        <Text
          style={[
            styles.buttonText,
            selectedIndex === 1 ? styles.buttonTextSelected : {},
          ]}>
          {secondButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default withTheme(Switcher);
