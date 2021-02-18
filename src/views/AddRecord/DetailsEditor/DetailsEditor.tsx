/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Button,
  Input,
  Overlay,
  Text,
  Theme,
  withTheme,
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {Details} from '../../../types/types';
import {DATE_TIME_FORMAT} from '../../../constants';
import moment from 'moment';

function DetailsEditor({
  theme,
  onClose,
  onDone,
  isVisible,
  details,
}: {
  theme: Theme;
  onClose: () => void;
  isVisible: boolean;
  details: Details;
  onDone: (details: Details) => void;
}) {
  const [detailsForm, setDetailsForm] = useState(details);

  const {width, height} = Dimensions.get('window');

  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose}>
      <View
        style={{
          width: width - 50,
          minHeight: height - 400,
          maxHeight: width - 100,
        }}>
        <View style={styles.headerContainer}>
          <Text h4>Details</Text>
        </View>
        <View style={styles.content}>
          <View style={{flex: 1, paddingTop: 30}}>
            <Text>Description</Text>
            <Input
              placeholder="Description"
              value={detailsForm.description}
              onChangeText={(val: string) =>
                setDetailsForm({...detailsForm, description: val})
              }
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 16}}>Date and time</Text>
              <DatePicker
                style={{width: 200}}
                date={
                  detailsForm.date
                    ? moment(detailsForm.date, DATE_TIME_FORMAT)
                    : null
                }
                mode="datetime"
                placeholder="Select a date"
                format={DATE_TIME_FORMAT}
                maxDate={moment(new Date()).format(DATE_TIME_FORMAT)}
                confirmBtnText="Confirm"
                showIcon={false}
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date: string) => {
                  setDetailsForm({...detailsForm, date});
                }}
              />
            </View>
          </View>
          <Button title="Confirm" onPress={() => onDone(detailsForm)} />
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    flex: 0.07,
  },
  content: {
    paddingHorizontal: 30,
    flex: 0.9,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  name: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
});

export default withTheme(DetailsEditor);
