/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Close from '../assets/icons/Close';
import moment from 'moment';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState<any>(false);

  // Example items with start dates
  const events: any = {
    '2024-08-06': [
      {name: 'Meeting with Bob', details: 'Discuss project updates'},
    ],
    '2024-08-07': [
      {name: 'Lunch with Alice', details: 'Catch up on recent events'},
    ],
    '2024-08-10': [{name: 'Doctor Appointment', details: 'Annual check-up'}],
  };

  // Highlight the days with events
  const markedDates = Object.keys(events).reduce((acc: any, date) => {
    acc[date] = {marked: true, dotColor: 'red'};
    return acc;
  }, {});

  const handleDayPress = (day: any) => {
    const eventsForDate = events[day.dateString] || [];
    if (eventsForDate.length > 0) {
      setSelectedDate({...day, events: eventsForDate});
      setModalVisible(true);
    }
  };

  const renderEventDetails = () => {
    if (!selectedDate) {
      return null;
    }
    return selectedDate?.events?.map((event: any, index: number) => (
      <View key={index} style={styles.event}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text>{event.details}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={styles.calendar}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('92%'),
              paddingVertical: wp('2%'),
            }}>
            <Text style={{fontSize: hp('2%'), fontWeight: '600'}}>
              Tasks on {moment(selectedDate).format('lll')}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Close fill={COLORS.grey} />
            </TouchableOpacity>
          </View>

          {renderEventDetails()}
        </View>
      </Modal>
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendar: {
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  event: {
    marginBottom: 10,
  },
  eventName: {
    fontWeight: 'bold',
  },
});
