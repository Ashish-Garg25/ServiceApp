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
import Checkbox from '../components/Checkbox';
import {getCountry} from 'react-native-localize';
import {getDeviceToken} from '../helpers/helpers';

const ChooseType = () => {
  const [userType, setUserType] = useState(0);
  const [createUser, {isLoading}] = useCreateUserMutation();

  const {firstName, lastName, email, password, address, phone, phoneVerified} =
    useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigation>();

  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isPromotionalChecked, setIsPromotionalChecked] = useState(false);

  const submit = async () => {
    try {
      const registrationToken = await getDeviceToken();

      const payload = {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        userType: userType === 1 ? 'Buyer' : userType === 2 ? 'Seller' : 'Both',
        phone_verified: phoneVerified ?? false,
        registrationToken: registrationToken,
        isPrivacyChecked,
        isPromotionalChecked,
      };

      const res = await createUser(payload).unwrap();

      if (res.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Account created successfully!',
        });

        const country = getCountry();

        dispatch(setUserDetails(res.data));

        if (userType !== 1 && country !== 'CA') {
          navigation.navigate('NotHiring');
        } else if (res?.data?.userType === 'Buyer') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('TaskerRoutes');
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
        <View
          style={{width: wp('92%'), marginTop: wp('4%'), marginLeft: wp('2%')}}>
          <Checkbox
            label={
              <Text>
                I have read and agree to the{' '}
                <Text style={styles.fw600}>Privacy Policy</Text> and{' '}
                <Text style={styles.fw600}>Terms of Service</Text>
              </Text>
            }
            onPress={() => setIsPrivacyChecked(!isPrivacyChecked)}
            isChecked={isPrivacyChecked}
          />
          <Checkbox
            label={
              <Text>
                I agree to receive general emails and promotional offers from
                Mr. Tasker
              </Text>
            }
            onPress={() => setIsPromotionalChecked(!isPromotionalChecked)}
            isChecked={isPromotionalChecked}
          />
        </View>
      </View>
      <Button
        title={isLoading ? <Loading /> : 'Submit'}
        onPress={submit}
        btnStyles={{marginVertical: wp('4%'), width: wp('90%')}}
        disabled={isLoading || !userType || userType === 0 || !isPrivacyChecked}
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
  fw600: {fontWeight: '600', color: COLORS.primary},
});
