/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../utils/color';
import SummaryCard from '../../components/SummaryCard';
import {LineChart} from 'react-native-chart-kit';
import {StackNavigation} from '../../helpers/interfaces';
import {Calendar} from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

const TaskerHome = () => {
  const navigation = useNavigation<StackNavigation>();
  const [date] = useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{width: wp('96%')}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetails', {id: 1})}>
          <View style={styles.wrapper}>
            <Text style={styles.mainText}>Cupboard Repair Request</Text>
            <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
              This is the first task you have been choosen for. Do the task with
              full devotion.
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.flex, {marginTop: wp('4%')}]}>
          <SummaryCard
            label={'Profits'}
            totalPayment={200}
            bg={COLORS.lightGreen}
          />
          <SummaryCard
            label={'Total Revenue'}
            totalPayment={5000}
            bg={COLORS.lightRed}
          />
        </View>

        <View>
          <Text style={styles.label}>Earnings</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [500, 800, 700, 900, 1000, 1200], // Sample earnings data
                },
              ],
            }}
            width={screenWidth - 30} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: COLORS.primary,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={{marginVertical: wp('4%')}}>
          <Text style={styles.label}>Calendar</Text>
          <Calendar
            // Initially visible month. Default = Date()
            current={String(date)}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day: any) => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
          />
        </View>
        <Image
          source={{
            uri: 'https://images.hindustantimes.com/tech/img/2023/07/25/original/afec2009-0cf1-4f08-9423-eee5386e7805.__V1____1690289777435.jpg',
          }}
          style={styles.image}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: wp('100%'),
    height: wp('40%'),
    marginTop: wp('6%'),
    alignSelf: 'center',
    // borderRadius: 16,
  },
  wrapper: {
    backgroundColor: COLORS.primaryLight1,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderColor: COLORS.primary,
    padding: wp('4%'),
    marginHorizontal: wp('2%'),
    width: wp('92%'),
    marginTop: wp('4%'),
  },
  text: {
    color: COLORS.secondary,
    paddingLeft: wp('1%'),
    fontSize: hp('1.6%'),
  },
  mainText: {
    fontWeight: '600',
    fontSize: hp('2%'), // 16
    lineHeight: hp('3%'), // 24
    color: 'black',
    textAlign: 'left',
    paddingVertical: wp('2%'), // 14,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginBottom: wp('4%'),
    marginTop: wp('6%'),
    marginLeft: wp('2%'),
  },
});
