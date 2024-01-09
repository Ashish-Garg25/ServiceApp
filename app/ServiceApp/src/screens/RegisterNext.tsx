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
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../redux/slices/user';
import {emptyString} from '../helpers/helpers';
import Mail from '../assets/icons/Mail';
import Lock from '../assets/icons/Lock';

const RegisterNext = () => {
  const navigation = useNavigation<StackNavigation>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setUserDetails({email, password}));
    navigation.navigate('ChooseType');
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        keyboardVerticalOffset={wp('4%')}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.wrapper}>
            <Text style={commonStyle.heading}>Tell us about yourself</Text>
            <Text style={commonStyle.subHeading}>
              Please enter your details below and proceed to explore service
              app.
            </Text>
            <View style={{margin: wp('4%'), flex: 1}}>
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
            </View>
          </View>
          <Button
            title={'Next'}
            onPress={handleNext}
            btnStyles={{
              marginTop: wp('6%'),
              width: wp('90%'),
              alignSelf: 'center',
            }}
            disabled={[email, password].some(item => emptyString(item))}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterNext;

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
