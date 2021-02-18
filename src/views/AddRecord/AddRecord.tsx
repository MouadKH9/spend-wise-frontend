/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Input, withTheme, Theme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import RNPickerSelect from 'react-native-picker-select';

import ButtonWithValue from '../../components/ButtonWithValue';
import Container from '../../components/Container';
import Switcher from '../../components/Switcher';
import CategoryPicker, {CategoryDTO} from '../CategoryPicker/CategoryPicker';
import {Account, Category, Details} from '../../types/types';
import {getAccounts} from '../../services/accounts.service';
import DetailsEditor from './DetailsEditor/DetailsEditor';
import {addRecord} from '../../services/records.service';
import {navigate} from '../../navigation/RootNavigation';

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
      marginRight: 10,
      borderRadius: 10,
      minHeight: 60,
      paddingHorizontal: 30,
    },
    addDetailsText: {
      fontSize: 18,
    },
  });

  const [recordType, setRecordType] = useState(recordTypes[0]);
  const [amount, setAmount] = useState<number | null>(null);
  const [showCateogryPicker, setShowCateogryPicker] = useState(false);
  const [showDetailsEditor, setShowDetailsEditor] = useState(false);
  const [category, setCategory] = useState<null | CategoryDTO>(null);
  const [account, setAccount] = useState<null | Account>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [details, setDetails] = useState<Details>({});

  useEffect(() => {
    refreshAccounts();
  }, []);

  const refreshAccounts = async () => {
    const newAccounts = await getAccounts();
    setAccounts(newAccounts);
    if (!account && newAccounts[0]) setAccount(newAccounts[0]);
  };

  const checkDisabled = () => !amount || isNaN(amount) || !account || !category;

  const createRecord = async () => {
    const {description, date} = details;
    const resp = await addRecord({
      description: description as string,
      date,
      amount: amount as number,
      account: account as Account,
      category: category?.category,
    });
    if (resp) {
      navigate('Activity');
    }
  };

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
        <Button
          disabled={checkDisabled()}
          type="clear"
          icon={<Icon name="check" size={28} />}
          onPress={createRecord}
        />
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
          <TouchableOpacity
            style={styles.addDetails}
            onPress={() => setShowDetailsEditor(true)}>
            <Text style={styles.addDetailsText}>Add details</Text>
          </TouchableOpacity>
          <ButtonWithValue
            text="Category"
            value={category?.category?.name || null}
            onPress={() => setShowCateogryPicker(true)}
          />
        </View>
        <View
          style={[
            styles.inlineView,
            {justifyContent: 'space-between', marginTop: 20},
          ]}>
          <Text style={{fontSize: 16}}>Account</Text>
          <RNPickerSelect
            onValueChange={(id: number) => {
              if (id)
                setAccount(accounts.find((el) => el.id === id) as Account);
            }}
            items={accounts.map((acc) => ({
              label: acc.name as string,
              value: acc.id,
            }))}
            // value={account}
            textInputProps={{
              style: {
                fontSize: 16,
              },
            }}
            placeholder={{label: 'Select an account'}}
          />
        </View>
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
      <CategoryPicker
        isVisible={showCateogryPicker}
        onClose={() => setShowCateogryPicker(false)}
        onSelect={(cat: CategoryDTO) => {
          setShowCateogryPicker(false);
          setCategory(cat);
        }}
        type={recordType === recordTypes[0] ? -1 : 1}
      />

      <DetailsEditor
        details={details}
        isVisible={showDetailsEditor}
        onClose={() => setShowDetailsEditor(false)}
        onDone={(det: Details) => {
          setShowDetailsEditor(false);
          setDetails(det);
        }}
      />
    </Container>
  );
}

export default withTheme(AddRecord);
