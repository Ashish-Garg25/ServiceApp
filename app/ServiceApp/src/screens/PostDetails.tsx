/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useGetTaskDetailsMutation,
  useUpdateTaskMutation,
} from '../redux/services';
import Loading from '../components/Loading';
import moment from 'moment';
import Pills from '../components/Pills';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import Button from '../components/Button';
import ConfirmationPopup from '../components/ConfirmationPopup';

export const MoreInfo = ({label, title, right, fullWidth, pill}: any) => {
  return (
    <View
      style={{
        flex: 1,
        width: fullWidth ? wp('80%') : wp('30%'),
        marginRight: wp('8%'),
        marginBottom: wp('4%'),
      }}>
      <Text
        style={[
          styles.text,
          {
            fontSize: hp('1.5%'),
            paddingLeft: wp(0),
            lineHeight: 24,
            textAlign: right ? 'right' : 'left',
          },
        ]}>
        {label}
      </Text>
      <Text
        style={[
          styles.name,
          {
            fontSize: hp('1.7%'),
            paddingLeft: wp(0),
            textAlign: right ? 'right' : 'left',
            color: pill ? COLORS.yellow : COLORS.black,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const PostDetails = ({route}: any) => {
  const navigation = useNavigation<StackNavigation>();
  const [taskDetails, {isLoading}] = useGetTaskDetailsMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await taskDetails({id: route.params.id}).unwrap();
        console.log(response);
        setDetails(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [route.params.id, taskDetails]);

  const updateTaskDetails = async (status: number) => {
    try {
      if (status === 3 || status === 4) {
        const payload = JSON.stringify({
          id: route?.params?.id,
          status: status === 3 ? 'Cancelled' : 'Complete',
        });

        const response = await updateTask(payload).unwrap();
        console.log('response ===', response);
      } else {
        throw 'Status can only be 3 or 4';
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={details.title}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <SafeAreaView style={[styles.container, {paddingHorizontal: wp('4%')}]}>
        <ScrollView
          style={{marginBottom: wp('4%')}}
          showsVerticalScrollIndicator={false}>
          {details?.taskImages?.length > 0 && (
            <Image
              source={{
                uri: details?.taskImages[0],
              }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <View style={{width: wp('96%'), marginVertical: wp('4%')}}>
            <Text style={[styles.name, {marginVertical: wp('4%')}]}>
              {details.title}
            </Text>
            <View style={{paddingVertical: wp('4%')}}>
              <Text style={styles.name}>About This task</Text>
              <Text style={styles.text}>{details.description}</Text>
            </View>
            <View style={{paddingVertical: wp('4%')}}>
              <Text style={styles.name}>Categories</Text>
              <View style={styles.wrapper1}>
                {details?.categories?.map(
                  (item: {name: string; _id: string}) => (
                    <Pills
                      title={item?.name}
                      onPress={() =>
                        navigation.navigate('Providers', {
                          id: item?._id,
                          name: item?.name,
                        })
                      }
                      selected={true}
                    />
                  ),
                )}
              </View>
            </View>
          </View>
          <View style={styles.extraContainer}>
            <View style={styles.extraWrapper}>
              <MoreInfo label={'Type'} title={details.taskType} />
              <MoreInfo label={'Status'} title={details.status} right pill />
            </View>

            <MoreInfo
              label={'Task Date'}
              title={moment(details.taskDate).format('MMMM Do YYYY, h:mm:ss a')}
              fullWidth
            />
            <MoreInfo
              label={'Task Location'}
              title={details.taskLocation}
              fullWidth
            />
          </View>

          {details?.status === 'In Progress' && (
            <>
              <Button
                title={'Complete Task'}
                onPress={() => {
                  setIsVisible(true);
                  setValue(4);
                }}
                btnStyles={{
                  width: wp('90%'),
                  backgroundColor: COLORS.green,
                  marginTop: wp('4%'),
                }}
              />

              <Button
                title={'Cancel Task'}
                onPress={() => {
                  setIsVisible(true);
                  setValue(3);
                }}
                outline
                textStyles={{color: COLORS.red}}
                btnStyles={{
                  width: wp('90%'),
                  backgroundColor: 'transparent',
                  marginVertical: wp('4%'),
                  borderColor: COLORS.red,
                  paddingVertical: wp('3%'),
                }}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      <ConfirmationPopup
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        onConfirm={() => updateTaskDetails(value)}
        title={'Are you sure?'}
        message={
          value === 3
            ? 'Are you sure you want to cancel this task? This action cannot be undone.'
            : 'Are you sure you want to mark this task as complete? This action cannot be undone.'
        }
        danger={value === 3}
      />
    </SafeAreaView>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: wp('100%'),
    height: wp('75%'),
    marginTop: wp('4%'),
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  name: {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('2%'),
    paddingLeft: wp('1%'),
    paddingBottom: wp('1%'),
  },
  text: {
    color: COLORS.secondary,
    paddingLeft: wp('2%'),
    fontSize: hp('1.6%'),
  },
  dp: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 9999,
    marginRight: wp('2%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: wp('4%'),
  },
  wrapper1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  extraContainer: {
    backgroundColor: COLORS.primaryLight1,
    marginHorizontal: wp('1%'),
    borderRadius: 16,
    padding: wp('4%'),
  },
  extraWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
