import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import {InputInterface} from '../helpers/interfaces';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  icon,
  helperText,
  keyboardType,
  bordered,
  inputStyles,
  multiline,
  numberOfLines,
  ...rest
}: InputInterface) => {
  return (
    <View style={{width: wp('90%')}}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapper}>
        <View style={styles.icon}>{icon}</View>
        <TextInput
          style={[
            {
              borderRadius: bordered ? wp('4%') : wp(0),
              paddingLeft: icon ? wp('7%') : wp('4%'),
            },
            inputStyles,
            styles.input,
            bordered ? styles.borderIpt : styles.bottomBorderIpt,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
        />
      </View>
      {helperText && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.grey,
    paddingVertical: wp('4%'),
    flex: 1,
    color: COLORS.black,
  },
  borderIpt: {
    borderWidth: 1,
  },
  bottomBorderIpt: {
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: '500',
    fontSize: hp('1.6%'), // 16
    lineHeight: hp('2.4%'), // 24
    color: COLORS.grey,
    paddingBottom: wp('1.5%'),
    marginTop: wp('4%'),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
  },
  helper: {
    fontSize: hp('1.3%'),
    color: COLORS.grey,
    lineHeight: 20,
    paddingTop: wp('2%'),
  },
});
