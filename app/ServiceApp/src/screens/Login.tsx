/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {commonStyle} from '../helpers/commonStyles';
import JoinUs from '../assets/icons/JoinUs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import Mail from '../assets/icons/Mail';
import {emptyString} from '../helpers/helpers';
import {useLoginMutation} from '../redux/services';
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../redux/slices/user';
import Toast from 'react-native-toast-message';
import Lock from '../assets/icons/Lock';

const Login = () => {
  const navigation = useNavigation<StackNavigation>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginM] = useLoginMutation();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      console.log('Running');
      const payload = {email, password};
      const res = await loginM(payload).unwrap();
      console.log('Response on login-> ', res);
      dispatch(setUserDetails(res));
      navigation.navigate('Home');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Incorrect Email or Password',
      });
      console.log(err);
    }
  };

  return (
    <View style={commonStyle.container}>
      <JoinUs size={wp('60%')} />
      <Text style={styles.text}>Welcome Back</Text>
      <Text style={styles.subText}>
        Please enter your email and password to continue where you left off.
      </Text>
      <View style={{marginHorizontal: wp('4%'), marginTop: wp('8%')}}>
        <Input
          label="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={(e: string) => setEmail(e)}
          icon={<Mail />}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={(e: string) => setPassword(e)}
          icon={<Lock />}
          secureTextEntry
        />
        <Text style={{paddingVertical: wp('4%'), alignSelf: 'flex-end'}}>
          Forgot Password?
        </Text>
        <Button
          title={'Log In'}
          onPress={login}
          btnStyles={{marginTop: wp('6%')}}
          disabled={emptyString(email) || emptyString(password)}
        />
        <Text style={commonStyle.text}>
          Don't have an account yet?{' '}
          <Text
            style={commonStyle.boldText}
            onPress={() => navigation.navigate('Register')}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: hp('2%'), // 16
    lineHeight: hp('3%'), // 24
    color: 'black',
    textAlign: 'center',
    paddingTop: wp('3%'), // 14,
  },
  subText: {
    fontWeight: '500',
    fontSize: hp('1.6%'), // 16
    lineHeight: hp('2.4%'), // 24
    color: COLORS.secondary,
    textAlign: 'center',
    paddingTop: wp('2%'), // 14,
    paddingHorizontal: wp('12%'),
  },
});
