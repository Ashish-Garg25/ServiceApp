/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Close from '../assets/icons/Close';
import moment from 'moment';
import {useGetCalendarTasksMutation} from '../redux/services';

const MyCalendar = () => {
  const [calendarTasks] = useGetCalendarTasksMutation();

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState<any>(false);

  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
  const [events, setEvents] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await calendarTasks({month: currentMonth}).unwrap();
        if (response.status === 200) {
          setEvents(response.data);
        } else {
          setEvents(null);
        }
      } catch (err) {
        console.log('err ====', err, currentMonth);
      }
    })();
  }, [calendarTasks, currentMonth]);

  const handleMonthChange = (month: any) => {
    const formattedMonth = moment(month.dateString).format('YYYY-MM');
    setCurrentMonth(formattedMonth);
  };

  // Highlight the days with events
  const markedDates =
    events &&
    Object.keys(events).reduce((acc: any, date) => {
      const status = events[date][0].status;

      acc[date] = {
        marked: true,
        dotColor: status === '2' ? COLORS.yellow : COLORS.red,
      };
      return acc;
    }, {});

  const handleDayPress = (day: any) => {
    if (events) {
      const eventsForDate = events[day.dateString] || [];
      if (eventsForDate.length > 0) {
        setSelectedDate({...day, events: eventsForDate});
        setModalVisible(true);
      }
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
        current={currentMonth}
        onMonthChange={handleMonthChange}
        pastScrollRange={12}
        futureScrollRange={12}
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
