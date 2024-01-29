/* eslint-disable react-hooks/exhaustive-deps */
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
import ProBanner from '../components/ProBanner';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import Star from '../assets/icons/Star';
import {useGetServiceDetailsMutation} from '../redux/services';
import Loading from '../components/Loading';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../components/BottomSheet';
import {StackNavigation} from '../helpers/interfaces';
import {triggerLocalNotification} from '../helpers/helpers';

export const MoreInfo = ({label, title, right}: any) => {
  return (
    <View style={{flex: 1, width: wp('40%')}}>
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
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const Review = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
        paddingBottom: wp('4%'),
      }}>
      <View style={[styles.wrapper, {alignItems: 'flex-start'}]}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={[styles.dp, {width: wp('10%'), height: wp('10%')}]}
          resizeMode="cover"
        />
        <View style={{flex: 1}}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.text}>United States | 2 weeks ago</Text>
          <Text style={[styles.text, {marginTop: wp('4%')}]}>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </Text>
        </View>
      </View>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </View>
  );
};

const ProviderDetails = ({route}: any) => {
  const navigation = useNavigation<StackNavigation>();
  const [getServiceDetails, {isLoading}] = useGetServiceDetailsMutation();

  const [serivce, setService] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);

  const {id} = route.params;

  useEffect(() => {
    (async () => {
      const response = await getServiceDetails({id}).unwrap();
      console.log('res', response);
      setService(response);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom: wp('4%')}}>
        <Image
          source={{
            uri: serivce?.service?.image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <ProBanner />
        <View style={{width: wp('96%'), marginVertical: wp('4%')}}>
          <View style={styles.wrapper}>
            <Image
              source={{
                uri: serivce?.originalPoster?.profilePic,
              }}
              style={styles.dp}
              resizeMode="cover"
            />
            <View style={{flex: 1}}>
              <Text
                style={
                  styles.name
                }>{`${serivce?.originalPoster?.firstName} ${serivce?.originalPoster?.lastName}`}</Text>
              <Text style={styles.text}>
                {serivce?.originalPoster?.businessName}{' '}
              </Text>
            </View>
          </View>

          <View style={{padding: wp('4%')}}>
            <Text style={styles.name}>About This service</Text>
            <Text style={styles.text}>{serivce?.service?.about}</Text>
          </View>
        </View>
        <View style={styles.extraContainer}>
          <View style={styles.extraWrapper}>
            <MoreInfo label={'From'} title={'India'} />
            <MoreInfo label={'Availability'} title={'Mon - Fri'} right />
          </View>
          <View style={[styles.extraWrapper, {marginTop: wp('4%')}]}>
            <MoreInfo
              label={'Member Since'}
              title={moment(serivce?.service?.availaility).format('MMM YYYY')}
            />
            <MoreInfo label={'Time'} title={'8 AM - 8 PM'} right />
          </View>
        </View>
        <View style={{padding: wp('4%'), paddingTop: wp('8%')}}>
          <Text style={styles.name}>Reviews </Text>
          {/* {serivce.service.reviews} */}
          {serivce?.service?.reviews?.map(() => (
            <Review />
          ))}
          <Review />
          <Review />
        </View>
      </ScrollView>
      <Button
        title={'Send Request'}
        btnStyles={{width: wp('92%'), marginBottom: wp('4%')}}
        onPress={() => setOpenModal(true)}
      />
      <BottomSheet
        isVisible={openModal}
        handleVisibility={() => setOpenModal(!openModal)}
        handleClick={() => {
          setOpenModal(false);
          triggerLocalNotification();
          navigation.navigate('Post', {screen: 'CreatePost'});
        }}
      />
    </SafeAreaView>
  );
};

export default ProviderDetails;

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
  extraContainer: {
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: wp('4%'),
    borderRadius: 16,
    padding: wp('4%'),
    paddingHorizontal: wp('6%'),
  },
  extraWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
