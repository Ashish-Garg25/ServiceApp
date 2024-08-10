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
import {
  useGetReviewsMutation,
  useGetServiceDetailsMutation,
} from '../redux/services';
import Loading from '../components/Loading';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../components/BottomSheet';
import {StackNavigation} from '../helpers/interfaces';
import {triggerLocalNotification} from '../helpers/helpers';
import {useDispatch} from 'react-redux';
import task from '../redux/slices/task';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import PlaceholderProfilePic from '../components/PlaceholderProfilePic';

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

const Review = ({content}: any) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
        paddingBottom: wp('4%'),
      }}>
      <View style={[styles.wrapper, {alignItems: 'flex-start'}]}>
        {content?.user?.profilePic ? (
          <Image
            source={{
              uri: content?.user?.profilePic,
            }}
            style={[styles.dp, {width: wp('10%'), height: wp('10%')}]}
            resizeMode="cover"
          />
        ) : (
          <PlaceholderProfilePic name={content?.user?.firstName} position={0} />
        )}
        <View style={{flex: 1}}>
          <Text
            style={
              styles.name
            }>{`${content?.user?.firstName} ${content?.user?.lastName}`}</Text>
          <Text style={styles.text}>
            {moment(content?.createdAt).format('lll')}
          </Text>
          <Text style={[styles.text, {marginTop: wp('4%')}]}>
            <StarRatingDisplay rating={content?.rating} />
          </Text>
        </View>
      </View>
      <Text style={styles.text}>{content?.content}</Text>
    </View>
  );
};

const ProviderDetails = ({route}: any) => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();

  const [getServiceDetails, {isLoading}] = useGetServiceDetailsMutation();
  const [getReviews] = useGetReviewsMutation();

  const [serivce, setService] = useState<any>({});
  const [reviews, setReviews] = useState<any>([]);

  const [openModal, setOpenModal] = useState(false);

  const {id} = route.params;

  console.log('ID ========', route.params);

  useEffect(() => {
    (async () => {
      const response = await getServiceDetails({id}).unwrap();
      console.log('res', response);
      setService(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getReviews({id}).unwrap();
      console.log('res', response);
      setReviews(response);
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
          {reviews?.map((item: any) => (
            <Review content={item} />
          ))}
        </View>
      </ScrollView>
      <Button
        title={'Send Request'}
        btnStyles={{width: wp('92%'), marginBottom: wp('4%')}}
        onPress={() => {
          setOpenModal(true);
        }}
      />
      <BottomSheet
        isVisible={openModal}
        handleVisibility={() => setOpenModal(!openModal)}
        handleClick={() => {
          setOpenModal(false);
          dispatch(task.actions.setInvited(serivce?.originalPoster?._id));
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
