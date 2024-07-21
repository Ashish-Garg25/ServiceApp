import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getCharAt} from '../helpers/helpers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

interface PlaceholderProfileInterface {
  name: string;
  position: number;
  size?: string;
}

const PlaceholderProfilePic = ({
  name,
  position,
  size,
}: PlaceholderProfileInterface) => {
  return (
    <View
      style={[
        {
          width: size ? wp(size) : wp('12%'),
          height: size ? wp(size) : wp('12%'),
        },
        styles.wrapper,
      ]}>
      <Text style={[size ? styles.largeText : styles.text]}>
        {getCharAt(name, position)}
      </Text>
    </View>
  );
};

export default PlaceholderProfilePic;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9999,
    backgroundColor: COLORS.lightGrey,
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: hp('2.4%'),
    lineHeight: hp('3%'),
    color: COLORS.green,
    paddingTop: wp('2.6%'),
    paddingLeft: wp('4.2%'),
  },
  largeText: {
    fontFamily: 'Inter-Bold',
    fontSize: hp('4%'),
    lineHeight: hp('3%'),
    color: COLORS.green,
    paddingTop: wp('8%'),
    paddingLeft: wp('7%'),
  },
});
