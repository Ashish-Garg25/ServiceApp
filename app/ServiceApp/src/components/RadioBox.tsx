import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type RadioBoxType = {
  title: string;
  subTitle: string;
  onPress: () => void;
  selected: boolean;
};

const RadioBox = ({title, subTitle, onPress, selected}: RadioBoxType) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: selected ? COLORS.primary : COLORS.primaryLight},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          {color: selected ? COLORS.white : COLORS.primary},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.subText,
          {color: selected ? COLORS.white : COLORS.secondary},
        ]}>
        {subTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: wp('4%'),
    width: wp('90%'),
    marginTop: wp('4%'),
  },
  text: {
    fontWeight: '600',
    fontSize: hp('2%'), // 16
    lineHeight: hp('3%'), // 24
    textAlign: 'left',
  },
  subText: {
    fontWeight: '500',
    fontSize: hp('1.5%'), // 16
    lineHeight: hp('2.2%'), // 24
    opacity: 0.9,
    textAlign: 'left',
    paddingTop: wp('1%'), // 14,
    paddingRight: wp('12%'),
  },
});
