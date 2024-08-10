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
import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import PlaceholderProfilePic from '../../components/PlaceholderProfilePic';
import Verified from '../../assets/icons/Verified';
import {useGetStatsMutation} from '../../redux/services';
import Loading from '../../components/Loading';

const ACTIONS = [
  {
    icon: <User />,
    title: 'Edit Profile',
    link: 'TaskerRegister',
  },
  {
    icon: <WalletIcon />,
    title: 'Wallet',
    subTitle: 'Coming Soon',
  },
  {
    icon: <DocIcon />,
    title: 'About',
    link: 'About',
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
  const user = useSelector((state: any) => state.user);

  const [stats, setStats] = useState<any>({});

  const [getStats, {isLoading}] = useGetStatsMutation();

  useEffect(() => {
    (async () => {
      try {
        const response = await getStats({type: 'today'}).unwrap();
        setStats(response);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
            style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.name, styles.value]}>
              ${stats?.total ?? 0}
            </Text>
            <Text style={styles.label}>Total Revenue</Text>
          </View>
          <View style={styles.hr} />
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.name, styles.value]}>{stats?.hired ?? 0}</Text>
            <Text style={styles.label}>Hired</Text>
          </View>
          <View style={styles.hr} />
          <View style={{alignItems: 'center'}}>
            <Verified color={COLORS.green} />
            <Text style={styles.label}>Verified</Text>
          </View>
        </View>

        {ACTIONS.map(({title, subTitle, icon, link}) => (
          <ActionCard
            title={title}
            subTitle={subTitle}
            icon={icon}
            onPress={() => link && navigation.navigate(link as never)}
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
  thumbnail: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 999,
    marginVertical: wp('6%'),
  },
});
