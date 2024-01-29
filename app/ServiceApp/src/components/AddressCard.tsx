/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pills from './Pills';

const AddressCard = ({content, navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={{flexGrow: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.mainText}>{content.address1}</Text>
          <View
            style={{
              width: wp('24%'),
              transform: [{scale: 0.8}],
              marginTop: wp('-2%'),
            }}>
            {content.isPrimary && <Pills title={'Primary'} selected />}
          </View>
        </View>
        <Text style={styles.subText}>
          {content.city}, {content.state}, {content.country}, {content.zipCode}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ManageAddress', {content: content})
        }>
        <Text>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    padding: wp('4%'),
    borderRadius: 16,
    margin: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('92%'),
  },
  mainText: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    color: COLORS.secondary,
  },
  subText: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.grey,
    paddingTop: wp('1%'),
  },
});
