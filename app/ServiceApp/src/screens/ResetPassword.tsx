/* eslint-disable react-native/no-inline-styles */
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {commonStyle} from '../helpers/commonStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import {emptyString} from '../helpers/helpers';
import Lock from '../assets/icons/Lock';
import {useResetPasswordMutation} from '../redux/services';
import Toast from 'react-native-toast-message';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';

const ResetPassword = () => {
  const navigation = useNavigation<StackNavigation>();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [resetPassword] = useResetPasswordMutation();

  const handleReset = async () => {
    try {
      const response: any = await resetPassword({
        oldPassword: password,
        newPassword,
      }).unwrap();

      console.log(response);

      if (response.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset successful',
        });

        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    }
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <ScreenHeader
        title={'Reset Password'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        keyboardVerticalOffset={wp('4%')}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.wrapper}>
            <Text style={commonStyle.subHeading}>
              Please enter your old password and new password.
            </Text>
            <View style={{margin: wp('4%'), flex: 1}}>
              <Input
                label="Old Password"
                placeholder="Enter Old Password"
                value={password}
                onChangeText={(e: string) => setPassword(e)}
                icon={<Lock />}
                secureTextEntry
              />

              <Input
                label="New Password"
                placeholder="Enter New Password"
                value={newPassword}
                onChangeText={(e: string) => setNewPassword(e)}
                icon={<Lock />}
                secureTextEntry
              />

              <Text
                style={{
                  paddingVertical: wp('4%'),
                  alignSelf: 'flex-end',
                  color: COLORS.primary,
                }}>
                Forgot Password?
              </Text>
            </View>
          </View>
          <Button
            title={'Save'}
            onPress={handleReset}
            btnStyles={{
              marginBottom: wp('6%'),
              width: wp('90%'),
              alignSelf: 'center',
            }}
            disabled={[password, newPassword].some(item => emptyString(item))}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: wp('4%'),
  },
  text: {
    fontWeight: '600',
    fontSize: hp('3%'), // 16
    lineHeight: hp('3%'), // 24
    color: 'black',
    textAlign: 'left',
    paddingTop: wp('3%'), // 14,
    marginLeft: wp('4%'),
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
  },
});
