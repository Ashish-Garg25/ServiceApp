import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {InputInterface} from '../helpers/interfaces';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import SearchIcon from '../assets/icons/SearchIcon';

const Search = ({value, onChangeText, placeholder}: InputInterface) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <SearchIcon color={COLORS.grey} />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.lightGrey,
    paddingVertical: wp('4%'),
    paddingLeft: wp('12%'),
    flex: 1,
    borderRadius: 9999,
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
    zIndex: 9999,
    marginLeft: wp('4%'),
  },
});
