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
import {useDispatch, useSelector} from 'react-redux';
import user from '../redux/slices/user';

type ScreenHeaderType = {
  navigation: NavigationProp<any>;
};

const MainHeader = ({navigation}: ScreenHeaderType) => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.user);

  const [show, setShow] = useState(false);

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity style={styles.wrapper} onPress={() => setShow(true)}>
        <Location />
        <View style={{marginLeft: wp('2%'), width: wp('60%')}}>
          <Text style={styles.name} numberOfLines={1}>
            {Array.isArray(data) ? data?.address[0]?.address1 : data?.address}
          </Text>

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
        handleLocation={loc =>
          dispatch(user.actions.setUserDetails({address: loc}))
        }
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
    backgroundColor: COLORS.lightGrey,
    marginBottom: wp('4%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: hp('2%'),
    fontWeight: '700',
  },
  label: {
    fontSize: hp('1.8%'),
    fontWeight: '400',
    color: COLORS.grey,
  },
});
