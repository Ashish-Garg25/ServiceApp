/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import ActionCard from '../components/ActionCard';
import Location from '../assets/icons/Location';
import HelpIcon from '../assets/icons/HelpIcon';
import DocIcon from '../assets/icons/DocIcon';
// import PaymentIcon from '../assets/icons/PaymentIcon';
import {useNavigation} from '@react-navigation/native';
import User from '../assets/icons/User';
import {StackNavigation} from '../helpers/interfaces';
import Lock from '../assets/icons/Lock';
import {useSelector} from 'react-redux';
import PlaceholderProfilePic from '../components/PlaceholderProfilePic';

const ACTIONS = [
  {
    icon: <User />,
    title: 'Edit Profile',
    link: 'EditProfile',
  },
  // {
  //   icon: <WalletIcon />,
  //   title: 'Wallet',
  //   link: 'Wallet',
  // },
  {
    icon: <Location />,
    title: 'Saved Address',
    link: 'SavedAddress',
  },
  {
    icon: <Lock />,
    title: 'Reset Password',
    link: 'ResetPassword',
  },
  {
    icon: <HelpIcon />,
    title: 'Help Center',
    link: 'HelpCenter',
  },
  {
    icon: <DocIcon />,
    title: 'Terms & Conditions',
    link: 'Terms',
  },
  {
    icon: <User />,
    title: 'Account Settings',
    link: 'AccountSettings',
  },
];

const Profile = () => {
  const navigation = useNavigation<StackNavigation>();
  const user = useSelector((state: any) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{alignSelf: 'center'}}>
          {user.profilePic ? (
            <Image
              source={{
                uri: user.profilePic,
              }}
              style={styles.image}
            />
          ) : (
            <View style={styles.thumbnail}>
              <PlaceholderProfilePic
                name={user.firstName}
                position={0}
                size={'20%'}
              />
            </View>
          )}

          <Text
            style={styles.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
        </TouchableOpacity>
        {/* <View style={styles.wrapper}>
          <View>
            <Text style={[styles.name, styles.value]}>$500.00</Text>
            <Text style={styles.label}>Last Spent</Text>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={[styles.name, styles.value]}>05</Text>
            <Text style={styles.label}>Hired</Text>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={[styles.name, styles.value]}>10+</Text>
            <Text style={styles.label}>Reviews</Text>
          </View>
        </View> */}

        {ACTIONS.map(({title, icon, link}) => (
          <ActionCard
            title={title}
            icon={icon}
            onPress={() => navigation.navigate(link as never)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 9999,
    marginBottom: wp('3%'),
    marginTop: wp('4%'),
  },
  name: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    alignSelf: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp('4%'),
    borderWidth: 1,
    borderColor: COLORS.lightGreen,
    borderRadius: 8,
    padding: wp('4%'),
    width: wp('92%'),
    backgroundColor: COLORS.white,
    shadowColor: COLORS.lightGreen,
    shadowOpacity: 0.3,
    shadowOffset: {width: 4, height: 4},
  },
  label: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.grey,
  },
  hr: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.lightGrey,
  },
  value: {
    color: COLORS.green,
  },
  thumbnail: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 999,
    marginVertical: wp('6%'),
  },
});
