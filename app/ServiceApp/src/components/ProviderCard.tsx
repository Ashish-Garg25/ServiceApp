/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Badge from './Badge';

const ProviderCard = ({details}: any) => {
  const {originalPoster, service} = details;

  return (
    <View style={styles.card}>
      <Badge title={'Lowest Price'} customStyles={styles.custom} />
      <Image
        source={{
          uri: service.image,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.wrapper}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.dp}
          resizeMode="cover"
        />
        <View style={{flex: 1}}>
          <Text
            style={
              styles.name
            }>{`${originalPoster?.firstName} ${originalPoster?.lastName}`}</Text>
          <Text style={styles.text}>
            {service.reviews > 0
              ? `${originalPoster.businessName} (${service.reviews})`
              : originalPoster.businessName}
          </Text>
        </View>
        <View>
          <Text style={[styles.text, {lineHeight: 22}]}>From </Text>
          <Text
            style={[
              styles.name,
              {
                color: COLORS.red,
                alignSelf: 'flex-end',
              },
            ]}>
            {`$${service.rate}/hr`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProviderCard;

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.1,
    shadowColor: COLORS.secondary,
    shadowRadius: 6,
    shadowOffset: {width: 4, height: 2},
    elevation: 6,
    backgroundColor: COLORS.white,
    margin: wp('2%'),
    borderRadius: 16,
  },
  image: {
    width: wp('92%'),
    height: wp('50%'),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dp: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 9999,
    marginRight: wp('2%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: wp('4%'),
  },
  name: {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('2%'),
    paddingLeft: wp('1%'),
    paddingBottom: wp('1%'),
  },
  text: {
    color: COLORS.secondary,
    paddingLeft: wp('1%'),
    fontSize: hp('1.6%'),
  },
  custom: {
    position: 'absolute',
    zIndex: 9999,
    marginLeft: wp('2%'),
  },
});
