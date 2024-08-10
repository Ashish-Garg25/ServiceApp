import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Time from '../assets/icons/Time';

const ProBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This Service Provider is a Professional</Text>
      <View style={styles.wrapper}>
        <Time />
        <Text style={{paddingLeft: wp('2%')}}>
          Experience working with large businesses
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Time />
        <Text style={{paddingLeft: wp('2%')}}>
          Handpicked by the Service Team
        </Text>
      </View>
    </View>
  );
};

export default ProBanner;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.lightGreen,
    backgroundColor: COLORS.lightGreen,
    padding: wp('4%'),
    borderRadius: 16,
    marginTop: wp('4%'),
    alignSelf: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: wp('2%'),
  },
  text: {paddingBottom: wp('2%'), fontWeight: '600', fontSize: wp('4%')},
});
