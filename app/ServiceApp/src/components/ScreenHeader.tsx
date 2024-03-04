import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationProp} from '@react-navigation/native';
import { COLORS } from '../utils/color';

type ScreenHeaderType = {
  title: string;
  renderPrefix?: React.ReactElement;
  renderSuffix?: React.ReactElement;
  navigation?: NavigationProp<any>;
};

const ScreenHeader = ({
  title,
  renderPrefix,
  renderSuffix,
  navigation,
}: ScreenHeaderType) => {
  return (
    <View style={styles.headerWrapper}>
      {renderPrefix && (
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          {renderPrefix}
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {renderSuffix && <View>{renderSuffix}</View>}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('3%'),
    paddingVertical: wp('1%'),
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    //fontSize: hp('1.8%'), 
    fontSize: hp('2%'),
    lineHeight: hp('2%'),
    textAlign: 'center',
    width: wp('90%'),
    color: COLORS.black,
  },
});
