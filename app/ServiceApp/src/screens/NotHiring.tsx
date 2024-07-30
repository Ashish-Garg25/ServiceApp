import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Lock from '../assets/icons/Lock';
import Logout from '../assets/icons/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';

const NotHiring = () => {
  const navigation = useNavigation<StackNavigation>();

  const logOut = async () => {
    await AsyncStorage.removeItem('user');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {name: 'Login'},
          // Add more routes here if necessary
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={logOut}>
        <Logout size={32} />
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <Lock size={80} color={COLORS.yellow} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Currently Not Hiring Taskers</Text>
        <Text style={styles.text}>
          We're not hiring new taskers in your area at the moment, but
          opportunities may open up soon. Please check back regularly for
          updates.
        </Text>
      </View>
    </View>
  );
};

export default NotHiring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconWrapper: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: 99999,
    backgroundColor: COLORS.lightYellow,
    marginVertical: wp('8%'),
    padding: wp('9.5%'),
  },
  wrapper: {
    padding: wp('4%'),
  },
  title: {
    fontSize: hp('3%'),
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: wp('2%'),
  },
  text: {
    fontSize: hp('2.1%'),
    color: COLORS.secondary,
    fontWeight: '400',
    textAlign: 'center',
  },
  logout: {
    paddingVertical: wp('8%'),
    alignSelf: 'flex-end',
    marginRight: wp('4%'),
  },
});
