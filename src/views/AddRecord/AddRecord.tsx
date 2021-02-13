import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Input, withTheme, Theme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import ButtonWithValue from '../../components/ButtonWithValue';

import Container from '../../components/Container';
import Switcher from '../../components/Switcher';

const recordTypes = ['expense', 'income'];

type OwnProps = {
  theme: Theme;
};

function AddRecord({theme}: OwnProps) {
  const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      flex: 0.1,
      alignItems: 'center',
    },
    inlineView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      paddingHorizontal: 30,
      marginTop: 10,
      flex: 0.6,
    },
    headerText: {
      marginLeft: 10,
    },
    labelText: {fontSize: 16, textAlign: 'center', marginVertical: 15},
    input: {
      marginVertical: 20,
    },
    keyboardContainer: {flex: 0.3},
    amountText: {
      fontSize: 18,
    },
    amountView: {
      marginTop: 50,
      justifyContent: 'space-between',
      borderBottomWidth: 0.3,
      borderColor: theme.colors?.grey0,
      paddingBottom: 10,
    },
    paddingH: {paddingHorizontal: 5, flex: 1},
    addDetails: {
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#F6F6F6',
      marginTop: 30,
      borderRadius: 10,
    },
    addDetailsText: {
      fontSize: 18,
    },
  });

  const [recordType, setRecordType] = useState(recordTypes[0]);
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <Container>
      <View style={styles.headerContainer}>
        <View style={styles.inlineView}>
          <TouchableOpacity>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText} h3>
            Add record
          </Text>
        </View>
        <Button type="clear" icon={<Icon name="check" size={28} />} />
      </View>
      <View style={styles.content}>
        <Text style={styles.labelText}>Record type</Text>
        <Switcher
          firstButton={recordTypes[0]}
          secondButton={recordTypes[1]}
          onChange={(index) => setRecordType(recordTypes[index])}
          selectedIndex={recordTypes.findIndex((type) => type === recordType)}
        />

        <View style={[styles.inlineView, styles.amountView]}>
          <Text
            style={[
              !amount ? {color: theme.colors?.grey0} : {},
              styles.amountText,
            ]}>
            {amount || 'Amount'}
          </Text>
          <Text style={styles.amountText}>MAD</Text>
        </View>
        <View
          style={[
            styles.inlineView,
            {justifyContent: 'space-between', marginTop: 20},
          ]}>
          <ButtonWithValue text="Account" value="Cash" />
          <ButtonWithValue text="Category" value="Food & Snacks" />
        </View>
        <TouchableOpacity style={styles.addDetails}>
          <Text style={styles.addDetailsText}>Add details</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboardContainer}>
        <VirtualKeyboard
          color="black"
          pressMode="string"
          onPress={(val: any) => {
            setAmount(val);
          }}
          decimal
        />
      </View>
    </Container>
  );
}

export default withTheme(AddRecord);
