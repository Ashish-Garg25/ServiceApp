import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Badge = ({title, customStyles}: any) => {
  return (
    <View
      style={[
        customStyles,
        styles.container,
        {backgroundColor: COLORS.primaryLight},
      ]}>
      <Text style={[styles.text, {color: COLORS.secondary}]}>{title}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('2%'),
    marginRight: wp('2%'),
    marginTop: wp('2%'),
  },
  text: {
    fontWeight: '600',
    fontSize: hp('1.6%'),
    textAlign: 'center',
  },
});
