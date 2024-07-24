/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
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
import {StackNavigation} from '../../helpers/interfaces';
import {useSendMessageMutation} from '../../redux/services';
import {useSelector} from 'react-redux';

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
  const navigation = useNavigation<StackNavigation>();
  const user = useSelector((state: any) => state.user);
  const {currentService} = useSelector((state: any) => state.service);
  const [sendMessage] = useSendMessageMutation();

  const {content} = route?.params;

  const createChat = async () => {
    try {
      const payload = JSON.stringify({
        sender: user._id,
        receiver: content.user,
        type: 'Offer',
        content: "Hi! I saw your post and I'm interested",
        offer: currentService?._id,
      });

      const response = await sendMessage(payload).unwrap();
      console.log(response);
      navigation.navigate('TaskerBottomTab', {screen: 'Messages'});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={content.title}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginBottom: wp('4%')}}>
          {content?.taskImages?.length > 0 ? (
            <Image
              source={{
                uri: content?.taskImages[0],
              }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: 'https://images.ctfassets.net/rz1oowkt5gyp/1IgVe0tV9yDjWtp68dAZJq/36ca564d33306d407dabe39c33322dd9/TaskManagement-hero.png',
              }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <View style={{marginVertical: wp('4%'), marginHorizontal: wp('4%')}}>
            <Text style={[styles.name, {marginVertical: wp('4%')}]}>
              {content.title}
            </Text>
            <View style={{paddingVertical: wp('4%')}}>
              <Text style={styles.name}>About This task</Text>
              <Text style={styles.text}>{content.description}</Text>
            </View>
          </View>
          <View style={styles.extraContainer}>
            <View style={styles.extraWrapper}>
              <MoreInfo label={'Type'} title={content?.taskType} />
              <MoreInfo label={'Status'} title={content?.status} right pill />
            </View>
            <View style={{width: 1, height: 8}} />
            <MoreInfo
              label={'Task Date'}
              title={moment(content?.createdAt).format(
                'MMMM Do YYYY, h:mm:ss a',
              )}
              fullWidth
            />
            <View style={{width: 1, height: 8}} />

            <MoreInfo
              label={'Task Location'}
              title={content?.taskLocation}
              fullWidth
            />
          </View>
        </ScrollView>

        {content?.status === 'Submitted' && (
          <Button
            title={'Send Profile'}
            onPress={createChat}
            btnStyles={{
              width: wp('92%'),
              transform: [{scale: 0.9}],
              backgroundColor: COLORS.green,
              marginBottom: wp('4%'),
            }}
          />
        )}

        {/* {content?.hireStatus === 'hired' ? (
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
        )} */}
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
