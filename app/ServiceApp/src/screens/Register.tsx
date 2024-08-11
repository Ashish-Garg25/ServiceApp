/* eslint-disable react-native/no-inline-styles */
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyle} from '../helpers/commonStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import User from '../assets/icons/User';
import Location from '../assets/icons/Location';
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../redux/slices/user';
import {emptyString, requestLocation} from '../helpers/helpers';
import Phone from '../assets/icons/Phone';
import {useSendOtpMutation, useVerifyOtpMutation} from '../redux/services';
import OTPTextView from 'react-native-otp-textinput';
import {COLORS} from '../utils/color';
import Toast from 'react-native-toast-message';

const Register = () => {
  const navigation = useNavigation<StackNavigation>();

  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [otpInput, setOtpInput] = useState<string>('');

  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Add event listeners for keyboard visibility
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (isDisabled) {
      timer = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter === 1) {
            clearInterval(timer);
            setIsDisabled(false);
            return 60;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isDisabled]);

  const handleNext = async () => {
    dispatch(setUserDetails({firstName, lastName, phone, address}));

    try {
      const response = await sendOtp({phone}).unwrap();
      console.log(response);

      setIsDisabled(true);
      setShowModal(!showModal);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleVerification = async () => {
    try {
      const response = await verifyOtp({phone: phone, code: otpInput}).unwrap();
      console.log(response);

      setShowModal(false);

      if (response.status === 'approved') {
        dispatch(setUserDetails({phoneVerified: true}));

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'OTP verified successfully!',
        });

        navigation.navigate('RegisterNext');
      } else if (response.status === 'expired') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'OTP Expired. Please try again',
        });
      } else if (response.status === 'max_attempts_reached') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Max Attempts reached. Please try again later',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to verify. Please try again later',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLocation = async () => {
    setLoading(true);
    try {
      requestLocation((formattedAddress: string) => {
        // Define the callback
        console.log('ffff', formattedAddress);
        setAddress(formattedAddress as any);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={wp('8%')}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, marginBottom: wp('4%')}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.wrapper}>
            <Text style={commonStyle.heading}>Tell us about yourself</Text>
            <Text style={commonStyle.subHeading}>
              Please enter your details below and proceed to explore service
              app.
            </Text>
            <View style={{margin: wp('4%'), flex: 1}}>
              <Input
                label="First Name"
                placeholder="Enter First Name"
                value={firstName}
                onChangeText={(e: string) => setFirstName(e)}
                icon={<User />}
              />
              <Input
                label="Last Name"
                placeholder="Enter Last Name"
                value={lastName}
                onChangeText={(e: string) => setLastName(e)}
                icon={<User />}
              />
              <Input
                label="Address"
                placeholder="Enter Address"
                value={address}
                onChangeText={(e: string) => setAddress(e)}
                icon={
                  <TouchableOpacity
                    style={{zIndex: 99999}}
                    onPress={fetchLocation}>
                    <Location />
                  </TouchableOpacity>
                }
                helperText={
                  'Service App is currently operating in Canada. Enter your address manually or press the pin icon to fetch your location.'
                }
              />

              <Input
                label="Phone"
                placeholder="Enter Phone"
                value={phone}
                onChangeText={(e: string) => setPhone(e)}
                keyboardType={'phone-pad'}
                icon={<Phone />}
              />
            </View>
          </View>
          <Button
            title={loading ? 'fetching..' : 'Next'}
            onPress={handleNext}
            btnStyles={{
              marginTop: wp('6%'),
              width: wp('90%'),
              alignSelf: 'center',
            }}
            disabled={
              loading ||
              [firstName, lastName, address, phone].some(item =>
                emptyString(item),
              )
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            width: wp('100%'),
            height: hp('107%'),
          }}>
          <View
            style={[
              styles.modalContainer,
              {bottom: isKeyboardVisible ? wp('50%') : wp('0')},
            ]}>
            <Text style={[commonStyle.heading, {paddingTop: wp('8%')}]}>
              Verify Phone
            </Text>
            <Text
              style={[
                commonStyle.subHeading,
                {textAlign: 'center', marginBottom: wp('6%')},
              ]}>
              Please the 6 digit otp sent to your registered mobile phone
            </Text>

            <OTPTextView
              handleTextChange={setOtpInput}
              inputCount={6}
              keyboardType="numeric"
            />

            <Button
              title={'Submit'}
              onPress={() => handleVerification()}
              btnStyles={{
                marginTop: wp('12%'),
                width: wp('90%'),
                alignSelf: 'center',
              }}
              disabled={otpInput === '' || otpInput.length < 6}
            />

            <TouchableOpacity
              onPress={() => {
                setIsDisabled(true);
                handleNext();
              }}
              disabled={isDisabled}
              style={{opacity: isDisabled ? 0.5 : 1, marginTop: wp('2%')}}>
              <Text style={{color: COLORS.green}}>
                Resend OTP {isDisabled && `in ${counter}s`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: wp('4%'),
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: wp('4%'),
    paddingBottom: wp('18%'),
    elevation: 6,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: -8},
    position: 'absolute',
    width: wp('100%'),
    alignItems: 'center',
  },
});
