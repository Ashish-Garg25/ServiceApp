import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/color';
import ActionCard from '../../components/ActionCard';
import DocIcon from '../../assets/icons/DocIcon';
// import PaymentIcon from '../../assets/icons/PaymentIcon';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../helpers/interfaces';
import RadioBox from '../../components/RadioBox';
import PaymentIcon from '../../assets/icons/PaymentIcon';
import ScreenHeader from '../../components/ScreenHeader';
import Back from '../../assets/icons/Back';
import Logout from '../../assets/icons/Logout';
import Delete from '../../assets/icons/Delete';

const ACTIONS = [
  {
    icon: <DocIcon />,
    title: 'Document Check',
    link: 'Verification',
  },
  {
    icon: <PaymentIcon />,
    title: 'Add Bank Account',
    link: 'Payment',
  },
  {
    icon: <Logout />,
    title: 'Logout',
    link: 'logout',
  },
  {
    icon: <Delete />,
    title: 'Delete Account',
    link: 'delete',
  },
];

const TaskerAccountSettings = () => {
  const navigation = useNavigation<StackNavigation>();

  const handleLogout = () => {
    console.log('logout');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => console.log('OK Pressed'),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Account Settings"
        navigation={navigation}
        renderPrefix={<Back />}
      />

      <RadioBox
        title={'Switch to Client Account'}
        subTitle={'Switch Back'}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {name: 'Home'},
                // Add more routes here if necessary
              ],
            }),
          );
        }}
        selected={false}
      />
      {ACTIONS.map(({title, icon, link}) => (
        <ActionCard
          title={title}
          icon={icon}
          onPress={() =>
            link === 'logout'
              ? handleLogout()
              : link === 'delete'
              ? handleDelete()
              : navigation.navigate(link as never)
          }
        />
      ))}
    </SafeAreaView>
  );
};

export default TaskerAccountSettings;

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
