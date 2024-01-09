import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationProp} from '@react-navigation/native';
import {COLORS} from '../utils/color';
import Bell from '../assets/icons/Bell';
import Location from '../assets/icons/Location';
import SearchPlaces from './SearchPlaces';

type ScreenHeaderType = {
  navigation: NavigationProp<any>;
};

const MainHeader = ({navigation}: ScreenHeaderType) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity style={styles.wrapper} onPress={() => setShow(true)}>
        <Location />
        <View style={{marginLeft: wp('2%')}}>
          <Text style={styles.name}>#123, Anvil St. CA, USA</Text>

          <Text style={styles.label}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Bell />
      </TouchableOpacity>
      <SearchPlaces
        isVisible={show}
        handleVisibility={() => setShow(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
    backgroundColor: COLORS.primaryLight1,
    paddingTop: wp('16%'),
    marginBottom: wp('4%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
  },
  label: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.grey,
  },
});
