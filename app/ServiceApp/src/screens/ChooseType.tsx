import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {commonStyle} from '../helpers/commonStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Button from '../components/Button';
import RadioBox from '../components/RadioBox';
import {useDispatch, useSelector} from 'react-redux';
import {useCreateUserMutation} from '../redux/services';
import Toast from 'react-native-toast-message';
// import {setUserDetails} from '../redux/slices/user';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import {setUserDetails} from '../redux/slices/user';
import Loading from '../components/Loading';

const ChooseType = () => {
  const [userType, setUserType] = useState(0);
  const [createUser, {isLoading}] = useCreateUserMutation();

  const {firstName, lastName, email, password, address, phone} = useSelector(
    (state: any) => state.user,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigation>();

  const submit = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        userType: userType === 1 ? 'Buyer' : userType === 2 ? 'Seller' : 'Both',
      };

      const res = await createUser(payload).unwrap();

      if (res.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Account created successfully!',
        });

        dispatch(setUserDetails(res.data));
        if (res?.data?.userType === 'Buyer') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('TaskerRoutes', {screen: 'TaskerBottomTab'});
        }
      } else {
        throw res;
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err?.data?.message ?? 'Something went wrong',
      });
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <View style={styles.wrapper}>
        <Text style={commonStyle.heading}>
          What are you more interested in?
        </Text>
        <Text style={commonStyle.subHeading}>
          What you choose doesn't limit you on Service App.
        </Text>
        <View style={{marginTop: wp('4%'), marginLeft: wp('2%')}}>
          <RadioBox
            title={'Getting Help'}
            subTitle={'I want to post tasks and find help'}
            onPress={() => setUserType(1)}
            selected={userType === 1}
          />
          <RadioBox
            title={'Making Money'}
            subTitle={'I want to help people, earn money and do flexible tasks'}
            onPress={() => setUserType(2)}
            selected={userType === 2}
          />
          <RadioBox
            title={'Both'}
            subTitle={
              'I want to do everything: find help and earn money on Service App'
            }
            onPress={() => setUserType(3)}
            selected={userType === 3}
          />
        </View>
      </View>
      <Button
        title={isLoading ? <Loading /> : 'Submit'}
        onPress={submit}
        btnStyles={{marginVertical: wp('4%'), width: wp('90%')}}
        disabled={isLoading || !userType || userType === 0}
      />
    </SafeAreaView>
  );
};

export default ChooseType;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: wp('4%'),
  },
  text: {
    fontWeight: '600',
    fontSize: hp('3%'), // 16
    lineHeight: hp('4%'), // 24
    color: 'black',
    textAlign: 'left',
    paddingTop: wp('3%'), // 14,
    marginLeft: wp('4%'),
    width: wp('80%'),
  },
  subText: {
    fontWeight: '500',
    fontSize: hp('1.6%'), // 16
    lineHeight: hp('2.4%'), // 24
    color: COLORS.secondary,
    textAlign: 'left',
    paddingTop: wp('2%'), // 14,
    paddingRight: wp('12%'),
    marginLeft: wp('4%'),
    width: wp('90%'),
  },
});
