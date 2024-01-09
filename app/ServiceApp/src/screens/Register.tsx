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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import User from '../assets/icons/User';
import Location from '../assets/icons/Location';
import {useDispatch} from 'react-redux';
import {setUserDetails} from '../redux/slices/user';
import {emptyString} from '../helpers/helpers';
import Phone from '../assets/icons/Phone';

const Register = () => {
  const navigation = useNavigation<StackNavigation>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(setUserDetails({firstName, lastName, phone, address}));
    navigation.navigate('RegisterNext');
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
                icon={<Location />}
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
            title={'Next'}
            onPress={handleNext}
            btnStyles={{
              marginTop: wp('6%'),
              width: wp('90%'),
              alignSelf: 'center',
            }}
            disabled={[firstName, lastName, address, phone].some(item =>
              emptyString(item),
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: wp('4%'),
  },
});
