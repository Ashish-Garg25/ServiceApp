import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Star from '../assets/icons/Star';
import {COLORS} from '../utils/color';

const SmallOfferCard = ({content}: any) => {
  return (
    <View>
      <Image source={{uri: content.image}} style={styles.cardImage} />
      <Text style={styles.name}>{content.name}</Text>
      <Text numberOfLines={2} style={styles.about}>
        {content.about}
      </Text>
      <View style={styles.star}>
        <Text>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </Text>
        <Text style={styles.rate}>${content.rate}</Text>
      </View>
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
  name: {fontSize: hp('2%'), fontWeight: '700'},
  about: {fontSize: hp('1.7%'), fontWeight: '400', width: wp('60%')},
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
});
