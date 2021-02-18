/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {
  Button,
  Input,
  Overlay,
  Text,
  Theme,
  withTheme,
} from 'react-native-elements';

function AddEntity({
  theme,
  onAdd,
  onClose,
  isVisible,
  entity,
}: {
  theme: Theme;
  isVisible: boolean;
  entity: string;
  onAdd: (data: any) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{width: Dimensions.get('window').width - 50}}>
        <Text>Name</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(name_: string) => setName(name_)}
        />
        {entity === 'account' && (
          <>
            <Text>Balance</Text>
            <Input
              placeholder="Balance"
              value={balance}
              onChangeText={(balance_) => setBalance(balance_)}
            />
          </>
        )}
        <Button
          title="Add"
          containerStyle={{marginTop: 20}}
          disabled={!name}
          onPress={() => onAdd({name, balance: balance || 0})}
        />
      </View>
    </Overlay>
  );
}

export default withTheme(AddEntity);
