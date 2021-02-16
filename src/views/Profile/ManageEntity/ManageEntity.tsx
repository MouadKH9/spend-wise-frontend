/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Button, Input, Text, Theme, withTheme} from 'react-native-elements';
import moment from 'moment';

import Container from '../../../components/Container';
import Item from '../../../components/Item';
import {Account, Record} from '../../../types/types';
import ItemLoader from '../../../components/ItemLoader';
import Divider from '../../../components/Divider';
import {DATE_FORMAT} from '../../../constants';
import {NavigationProps} from '../ProfileStack';
import {
  addAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from '../../../services/accounts.service';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddEntity from './AddEntity';

function ManageEntity({route, theme}: {theme: Theme} & NavigationProps) {
  const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      flex: 0.1,
    },
    content: {
      paddingHorizontal: 30,
      marginTop: 10,
      flex: 0.9,
    },
  });
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [addingEntity, setAddingEntity] = useState(false);

  const {entity, title} = route.params;
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    let dataGetter: any = null;
    switch (entity) {
      case 'account':
        dataGetter = getAccounts;
        break;

      default:
        break;
    }
    if (!dataGetter) return;
    setLoading(true);
    const newData = await dataGetter();
    setData(newData);
    setLoading(false);
  };

  const update = async () => {
    let entityUpdate: any = null;
    switch (entity) {
      case 'account':
        entityUpdate = updateAccount;
        break;

      default:
        break;
    }
    if (!entityUpdate) return;
    setLoading(true);
    await entityUpdate(selectedEntity);
    setSelectedEntity(null);
    await fetchdata();
  };

  const deleteEntity = async () => {
    let entityDelete: any = null;
    switch (entity) {
      case 'account':
        entityDelete = deleteAccount;
        break;

      default:
        break;
    }
    if (!entityDelete) return;
    setLoading(true);
    await entityDelete(selectedEntity?.id);
    setSelectedEntity(null);
    await fetchdata();
  };

  const addEntity = async (data: any) => {
    let entityUpdate: any = null;
    switch (entity) {
      case 'account':
        setLoading(true);
        setAddingEntity(false);
        await addAccount(data as Account);
        await fetchdata();
        break;

      default:
        break;
    }
    if (!entityUpdate) return;
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {name: string; id: number};
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedEntity(data.find((el) => el.id === item.id))}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: 'gray',
          borderBottomWidth: data[index + 1] ? 0.3 : 0,
        }}>
        <Text style={{fontSize: 18}}>{item.name}</Text>
        <Icon name="chevron-right" size={20} />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <View style={styles.headerContainer}>
        <Text h2>{title}</Text>
      </View>
      <View style={styles.content}>
        {loading ? (
          <ItemLoader />
        ) : selectedEntity ? (
          <View style={{paddingTop: 50}}>
            <Text>Name</Text>
            <Input
              placeholder="Name"
              value={selectedEntity.name}
              onChangeText={(name) =>
                setSelectedEntity({...selectedEntity, name})
              }
            />
            <Button
              title="Delete"
              buttonStyle={{backgroundColor: theme.colors?.warning}}
              containerStyle={{marginTop: 50}}
              onPress={deleteEntity}
            />
            <Button
              title="Update"
              containerStyle={{marginTop: 20}}
              disabled={
                selectedEntity.name ===
                data.find((el) => el.id === selectedEntity.id)?.name
              }
              onPress={update}
            />
          </View>
        ) : (
          <FlatList
            style={{flex: 1}}
            renderItem={renderItem}
            data={data}
            ListFooterComponent={
              <Button
                onPress={() => setAddingEntity(true)}
                title={'Add'}
                type="outline"
                icon={
                  <Icon
                    name="plus-circle"
                    color={theme.colors?.primary}
                    size={24}
                    style={{marginRight: 10}}
                  />
                }
                containerStyle={{
                  marginTop: 50,
                }}
              />
            }
          />
        )}
      </View>
      <AddEntity
        entity={entity}
        isVisible={addingEntity}
        onClose={() => setAddingEntity(false)}
        onAdd={addEntity}
      />
    </Container>
  );
}

export default withTheme(ManageEntity);
