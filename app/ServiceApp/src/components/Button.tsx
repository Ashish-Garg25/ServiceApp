/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ButtonInterface} from '../helpers/interfaces';

const Button = ({
  title,
  onPress,
  btnStyles,
  textStyles,
  disabled,
  outline,
}: ButtonInterface) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btnContainer,
        outline ? styles.outline : styles.primary,
        btnStyles,
        {opacity: disabled ? 0.6 : 1},
      ]}
      disabled={disabled}>
      <Text
        style={[
          styles.btnText,
          outline ? styles.outlineText : styles.primaryText,
          textStyles,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 16,
    paddingVertical: wp('4%'),
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1.2,
    borderColor: COLORS.primary,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  outlineText: {
    color: COLORS.primary,
  },
  primaryText: {
    color: COLORS.white,
  },
});
