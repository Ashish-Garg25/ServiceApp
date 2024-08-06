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
import React, {useEffect, useState} from 'react';
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
import {
  useGetMyServiceMutation,
  useGetStatsMutation,
} from '../../redux/services';
import {useDispatch, useSelector} from 'react-redux';
import service from '../../redux/slices/service';
import Dropdown from '../../components/Dropdown';
import {formatDate} from '../../helpers/helpers';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

const screenWidth = Dimensions.get('window').width;

const TaskerHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigation>();
  const [date] = useState(new Date());

  const user = useSelector((state: any) => state.user);

  const [getMyService] = useGetMyServiceMutation();
  const [getStats, {isLoading}] = useGetStatsMutation();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Today');

  const [total, setTotal] = useState(0);
  const [labels, setLabels] = useState<any>([]);
  const [values, setValues] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        await fetchStats('today');

        const response = await getMyService({id: user._id}).unwrap();
        console.log('res ==', response);
        dispatch(service.actions.setService(response[0]));
      } catch (err) {
        console.log('err ==', err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMyService, user._id]);

  const fetchStats = async (type: string) => {
    try {
      console.log(type);
      const response = await getStats({type}).unwrap();
      if (response.variant === 'success') {
        setTotal(response.total);

        const labelDatas = Object.keys(response.data);

        const formattedLabels = labelDatas.map(formatDate);
        const data = Object.values(response.data);

        setLabels(formattedLabels);
        setValues(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            totalPayment={total}
            bg={COLORS.lightGreen}
          />
        </View>

        {isLoading ? (
          <Loading />
        ) : labels?.length > 0 && values?.length > 0 ? (
          <View>
            <View style={styles.flexWrapper}>
              <Text style={styles.label}>Earnings</Text>
              <View>
                <Button
                  title={dropdownValue}
                  outline
                  onPress={() => setOpenDropdown(!openDropdown)}
                  btnStyles={{width: wp('30%'), borderColor: COLORS.secondary}}
                  textStyles={{color: COLORS.secondary}}
                />
                {openDropdown && (
                  <Dropdown
                    dropdownListContent={[
                      {id: 1, name: 'Today'},
                      {id: 2, name: 'Weekly'},
                      {id: 3, name: 'Monthly'},
                      {id: 4, name: 'Yearly'},
                    ]}
                    handleDropdown={(value: any) => {
                      console.log(value);
                      setDropdownValue(value.name ?? dropdownValue);
                      fetchStats(value?.name?.toLowerCase());
                      setOpenDropdown(false);
                    }}

                    customStyles={{left: -80, width: wp('50%')}}
                  />
                )}
              </View>
            </View>
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: values, // Sample earnings data
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
        ) : (
          <Empty />
        )}

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
  flexWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
