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
import Loading from '../components/Loading';
import {getCountry} from 'react-native-localize';

const Login = () => {
  const navigation = useNavigation<StackNavigation>();
  const [email, setEmail] = useState('Test3@gmail.com');
  const [password, setPassword] = useState('Pass@123');

  const [loginM, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const payload = {email, password};
      const res = await loginM(payload).unwrap();

      console.log('rrrr', res);
      dispatch(setUserDetails(res.userFound));

      const country = getCountry();

      console.log(res?.userFound?.userType, country);

      if (res?.userFound?.userType !== 'Buyer' && country !== 'CA') {
        console.log(res?.userFound?.userType, country);

        navigation.navigate('NotHiring');
      } else if (res?.userFound?.userType === 'Buyer') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('TaskerRoutes', {screen: 'TaskerBottomTab'});
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Incorrect Email or Password',
      });
      console.log('errr ====', err);
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
          title={isLoading ? <Loading color={COLORS.white} /> : 'Log In'}
          onPress={login}
          btnStyles={{marginTop: wp('6%')}}
          disabled={isLoading || emptyString(email) || emptyString(password)}
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
