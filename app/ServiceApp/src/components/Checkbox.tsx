import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../utils/color';
import Tick from '../assets/icons/Tick';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Checkbox = ({label, onToggle, isChecked}: any) => {
  const handleToggle = () => {
    onToggle && onToggle(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked ? (
          <Tick color={COLORS.white} width={16} height={16} strokeWidth={3} />
        ) : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp('4%'),
    marginLeft: 0,
  },
  checkbox: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.grey,
    marginRight: wp('2%'),
  },
  checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
