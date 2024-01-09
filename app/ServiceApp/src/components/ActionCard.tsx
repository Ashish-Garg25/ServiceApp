import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ChevronRight from '../assets/icons/ChevronRight';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

type ActionCardType = {
  title: string;
  icon: React.ReactElement;
  onPress: () => void;
};

const ActionCard = ({title, icon, onPress}: ActionCardType) => {
  return (
    <TouchableOpacity style={styles.actionWrapper} onPress={onPress}>
      <View style={styles.action}>
        {icon && icon}
        <Text
          style={[
            styles.name,
            {color: title === 'Delete Account' ? COLORS.red : COLORS.black},
          ]}>
          {title}
        </Text>
      </View>
      <ChevronRight
        stroke={title === 'Delete Account' ? COLORS.red : COLORS.primary}
      />
    </TouchableOpacity>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('92%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    padding: wp('4%'),
    paddingVertical: wp('6%'),
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: hp('1.8%'),
    fontWeight: '500',
    paddingLeft: wp('2%'),
  },
});
