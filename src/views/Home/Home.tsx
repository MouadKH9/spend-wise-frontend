/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import {Text} from 'react-native-elements';
import {LineChart, PieChart} from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';

import Container from '../../components/Container';
import {
  getActivityPerPeriod,
  getExpensesStructure,
} from '../../services/stats.service';
import {Category} from '../../types/types';

type Period = 'daily' | 'weekly' | 'monthly';

const colors = ['#27ae60', '#e67e22', '#2980b9', '#8e44ad', '#8e44ad'];

const NUMBER_TO_SHOW = 7;

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('daily');

  const [activityPerPeriod, setActivityPerPeriod] = useState<{
    loading: boolean;
    labels: string[];
    data: number[];
  }>({
    loading: true,
    data: [],
    labels: [],
  });
  const [expensesStructure, setExpensesStructure] = useState<{
    loading: boolean;
    data: number[];
  }>({
    loading: true,
    data: [],
    labels: [],
  });

  const refreshActivity = async () => {
    setActivityPerPeriod({...activityPerPeriod, loading: true});
    const newData = await getActivityPerPeriod(selectedPeriod);
    setActivityPerPeriod({
      loading: false,
      data: Object.values(newData).slice(
        Object.values(newData).length - NUMBER_TO_SHOW,
      ),
      labels: Object.keys(newData)
        .slice(Object.keys(newData).length - NUMBER_TO_SHOW)
        .map((el) => el.substr(5)),
    });
  };

  const refreshExpensesStructure = async () => {
    setExpensesStructure({...expensesStructure, loading: true});
    const newData = await getExpensesStructure(selectedPeriod);
    console.log(
      '🚀 ~ file: Home.tsx ~ line 53 ~ refreshExpensesStructure ~ newData',
      newData,
    );
    let colorIndex = 0;
    setExpensesStructure({
      loading: false,
      data: newData.map(
        ({category, total}: {category: Category; total: number}) => ({
          name: category.name,
          total,
          color: colors[colorIndex] ? colors[colorIndex++] : 'gray',
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
        }),
      ),
    });
  };

  useEffect(() => {
    refreshActivity();
    refreshExpensesStructure();
  }, [selectedPeriod]);

  console.log('Pie data', expensesStructure.data);

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Text>Period</Text>
        <RNPickerSelect
          onValueChange={(value: Period) => {
            if (value) setSelectedPeriod(value);
          }}
          items={[
            {label: 'Daily', value: 'daily'},
            {label: 'Weekly', value: 'weekly'},
            {label: 'Monthly', value: 'monthly'},
          ]}
          // value={account}
          textInputProps={{
            style: {
              fontSize: 16,
            },
          }}
          placeholder={{label: 'Select a period'}}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginTop: 50, fontSize: 18, marginBottom: 20}}>
          <Text style={{textTransform: 'capitalize'}}>{selectedPeriod}</Text>{' '}
          activity
        </Text>
        {activityPerPeriod.loading ? (
          <ActivityIndicator
            style={{marginVertical: 100}}
            size="large"
            color="#5DB075"
          />
        ) : (
          <LineChart
            data={{
              labels: activityPerPeriod.labels,
              datasets: [
                {
                  data: activityPerPeriod.data,
                },
              ],
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: '#5DB075',
              backgroundGradientFrom: '#7ac08e',
              backgroundGradientTo: '#2fa551',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#5DB075',
              },
            }}
            bezier
          />
        )}

        <Text style={{marginTop: 50, fontSize: 18, marginBottom: 20}}>
          <Text style={{textTransform: 'capitalize'}}>{selectedPeriod}</Text>{' '}
          expenses structure
        </Text>
        {activityPerPeriod.loading ? (
          <ActivityIndicator
            style={{marginVertical: 100}}
            size="large"
            color="#5DB075"
          />
        ) : expensesStructure.data.length > 0 ? (
          <PieChart
            data={expensesStructure.data}
            width={Dimensions.get('window').width} // from react-native
            height={300}
            chartConfig={{
              backgroundColor: '#5DB075',
              backgroundGradientFrom: '#7ac08e',
              backgroundGradientTo: '#2fa551',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              width: Dimensions.get('window').width - 300,
              // style: {
              //   borderRadius: 16,
              // },
              // propsForDots: {
              //   r: '6',
              //   strokeWidth: '2',
              //   stroke: '#5DB075',
              // },
            }}
            accessor={'total'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[30, 0]}
            absolute
          />
        ) : (
          <Text style={{marginVertical: 100, fontSize: 16, color: 'gray'}}>
            No data
          </Text>
        )}
      </View>
    </Container>
  );
}
