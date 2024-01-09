import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Pills = ({title, selected, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: selected ? COLORS.primary : COLORS.primaryLight},
      ]}>
      <Text
        style={[
          styles.text,
          {color: selected ? COLORS.white : COLORS.secondary},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Pills;

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
