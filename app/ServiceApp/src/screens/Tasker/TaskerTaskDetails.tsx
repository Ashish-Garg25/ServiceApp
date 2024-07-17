/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import ScreenHeader from '../../components/ScreenHeader';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';

export const MoreInfo = ({
  label,
  title,
  right,
  fullWidth,
  pill,
  completed,
}: any) => {
  return (
    <View style={{flex: 1, width: fullWidth ? wp('80%') : wp('40%')}}>
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
            color:
              pill && completed
                ? COLORS.green
                : pill && !completed
                ? COLORS.yellow
                : COLORS.black,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const TaskerTaskDetails = ({route}: any) => {
  const navigation = useNavigation();

  const [isAccepted, setIsAccepted] = useState(false);

  const {content} = route?.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Cupboard Repair Request'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginBottom: wp('4%')}}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{marginVertical: wp('4%'), marginHorizontal: wp('4%')}}>
            <Text style={[styles.name, {marginVertical: wp('4%')}]}>
              Cupboard Repair Request
            </Text>
            <View style={{paddingVertical: wp('4%')}}>
              <Text style={styles.name}>About This task</Text>
              <Text style={styles.text}>
                This is the first task you have been choosen for. Do the task
                with full devotion.
              </Text>
            </View>
          </View>
          <View style={styles.extraContainer}>
            <View style={styles.extraWrapper}>
              <MoreInfo label={'Type'} title={'Remote'} />
              <MoreInfo
                label={'Status'}
                title={content?.status}
                right
                pill
                completed
              />
            </View>
            <View style={{width: 1, height: 8}} />
            <MoreInfo
              label={'Task Date'}
              title={moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
              fullWidth
            />
            <View style={{width: 1, height: 8}} />

            <MoreInfo
              label={'Task Location'}
              title={'Anvil Street'}
              fullWidth
            />
          </View>
        </ScrollView>

        {content?.hireStatus === 'hired' ? (
          <View />
        ) : isAccepted ? (
          <View>
            <Button
              title={'End Contract'}
              onPress={() => setIsAccepted(!isAccepted)}
              btnStyles={{width: wp('92%'), backgroundColor: COLORS.green}}
            />
            <Button
              title={'Raise Dispute'}
              onPress={() => console.log('ttt')}
              btnStyles={{
                width: wp('92%'),
                backgroundColor: COLORS.white,
                marginBottom: wp('4%'),
                marginTop: wp('2%'),
              }}
              textStyles={{color: COLORS.secondary}}
            />
          </View>
        ) : (
          <View>
            <Button
              title={'Accept Offer'}
              onPress={() => setIsAccepted(!isAccepted)}
              btnStyles={{width: wp('92%')}}
            />
            <Button
              title={'Decline Offer'}
              onPress={() => console.log('ttt')}
              btnStyles={{
                width: wp('92%'),
                backgroundColor: COLORS.danger,
                marginBottom: wp('4%'),
                marginTop: wp('2%'),
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default TaskerTaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: wp('100%'),
    height: wp('50%'),
    marginTop: wp('4%'),
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
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: wp('4%'),
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
