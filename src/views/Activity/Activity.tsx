import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Button, Text, withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

import Container from '../../components/Container';
import Item from '../../components/Item';
import {getRecords} from '../../services/records.service';
import {Record} from '../../types/types';
import ItemLoader from '../../components/ItemLoader';
import Divider from '../../components/Divider';
import {DATE_FORMAT} from '../../constants';

function Activity() {
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
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    start: null,
    end: null,
    type: null,
    category: null,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const newRecords = await getRecords();
    setRecords(newRecords);
    setLoading(false);
  };

  const renderItem = ({item, index}: {item: Record; index: number}) => {
    const showDivider =
      index === 0 || !moment(records[index - 1].date).isSame(item.date, 'day');
    return (
      <>
        {showDivider && (
          <Divider
            text={`${
              moment(item.date).isSame(new Date(), 'day') ? 'Today ' : ''
            }${moment(item.date).format(DATE_FORMAT)}`}
          />
        )}
        <Item record={item} showBorder={!showDivider} />
      </>
    );
  };
  return (
    <Container>
      <View style={styles.headerContainer}>
        <Text h2>Activity</Text>
        <Button type="clear" icon={<Icon name="filter" size={30} />} />
      </View>
      <View style={styles.content}>
        {loading ? (
          <ItemLoader />
        ) : (
          <FlatList
            style={{flex: 1}}
            renderItem={renderItem}
            data={records.sort((a, b) => b.id - a.id)}
          />
        )}
      </View>
    </Container>
  );
}

export default withTheme(Activity);
