import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Button from './Button';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useUpdateOfferMutation} from '../redux/services';
import Toast from 'react-native-toast-message';

const SmallOfferCard = ({content}: any) => {
  const user = useSelector((state: any) => state.user);

  const [updateOffer] = useUpdateOfferMutation();

  const acceptOffer = async () => {
    try {
      const payload = JSON.stringify({
        offerId: content?.offerDetails[0]?._id,
        status: 2,
      });

      const response = await updateOffer(payload).unwrap();

      if (response?.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Offer Accepted!',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const declineOffer = async () => {
    try {
      const payload = JSON.stringify({
        offerId: content?.offerDetails[0]?._id,
        status: 3,
      });

      const response = await updateOffer(payload).unwrap();

      if (response?.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Offer Declined!',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const contentUser =
    content?.offerDetails[0]?.buyerId === content?.senderDetails?._id
      ? content?.senderDetails
      : content?.receiverDetails;

  return (
    <View>
      <Text
        style={
          styles.name
        }>{`${contentUser?.firstName} has proposed a contract`}</Text>
      <Text numberOfLines={2} style={styles.about}>
        {content?.offerDetails[0]?.additionalInfo}
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        Start Date -{' '}
        <Text style={styles.main}>
          {moment(content?.offerDetails[0]?.startDate).format('DD-MM-YYYY')}
        </Text>
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        Rate -{' '}
        <Text style={styles.main}>${content?.offerDetails[0]?.rate}</Text>
      </Text>
      {contentUser?._id === user?._id && (
        <>
          <Button
            title={'Accept'}
            onPress={acceptOffer}
            btnStyles={{
              width: wp('60%'),
              transform: [{scale: 0.9}],
              backgroundColor: COLORS.green,
              marginBottom: wp('2%'),
              marginTop: wp('4%'),
            }}
          />
          <Button
            title={'Decline'}
            onPress={declineOffer}
            outline
            textStyles={{color: COLORS.red}}
            btnStyles={styles.declineBtn}
          />
        </>
      )}
    </View>
  );
};

export default SmallOfferCard;

const styles = StyleSheet.create({
  cardImage: {
    width: wp('60%'),
    height: hp('20%'),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginVertical: wp('2%'),
  },
  name: {fontSize: hp('1.9%'), fontWeight: '600', color: COLORS.black},
  about: {
    fontSize: hp('1.7%'),
    fontWeight: '400',
    width: wp('60%'),
    paddingVertical: wp('2%'),
  },
  title: {
    fontSize: hp('1.7%'),
    fontWeight: '500',
    width: wp('60%'),
    paddingTop: wp('1%'),
  },
  main: {
    fontWeight: '700',
    color: COLORS.green,
  },
  star: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp('2%'),
  },
  rate: {
    fontWeight: '700',
    fontSize: hp('2.3%'),
    marginRight: wp('4%'),
    color: COLORS.red,
  },
  declineBtn: {
    width: wp('60%'),
    transform: [{scale: 0.9}],
    backgroundColor: 'transparent',
    borderColor: COLORS.red,
    marginBottom: wp('2%'),
  },
});
