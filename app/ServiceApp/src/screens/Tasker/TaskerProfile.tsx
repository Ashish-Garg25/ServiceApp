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
import {COLORS} from '../../utils/color';
import ActionCard from '../../components/ActionCard';
import HelpIcon from '../../assets/icons/HelpIcon';
import DocIcon from '../../assets/icons/DocIcon';
// import PaymentIcon from '../../assets/icons/PaymentIcon';
import {useNavigation} from '@react-navigation/native';
import User from '../../assets/icons/User';
import {StackNavigation} from '../../helpers/interfaces';
import Lock from '../../assets/icons/Lock';
import WalletIcon from '../../assets/icons/WalletIcon';

const ACTIONS = [
  {
    icon: <User />,
    title: 'Edit Profile',
    link: 'TaskerRegister',
  },
  {
    icon: <WalletIcon />,
    title: 'Wallet',
    link: 'Wallet',
  },
  {
    icon: <DocIcon />,
    title: 'About',
    link: 'Terms',
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
    icon: <User />,
    title: 'Account Settings',
    link: 'TaskerAccountSettings',
  },
];

const TaskerProfile = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{alignSelf: 'center'}}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.image}
          />
          <Text style={styles.name}>Sarah Dame</Text>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <View>
            <Text style={[styles.name, styles.value]}>$500.00</Text>
            <Text style={styles.label}>Amount Spent</Text>
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
        </View>

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

export default TaskerProfile;

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
});
