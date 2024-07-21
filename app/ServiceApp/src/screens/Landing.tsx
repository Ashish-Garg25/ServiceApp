import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/icons/Logo';
import {COLORS} from '../utils/color';
import Button from '../components/Button';
import {commonStyle} from '../helpers/commonStyles';
import {StackNavigation} from '../helpers/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import {setUserDetails} from '../redux/slices/user';
import {useDispatch} from 'react-redux';

const Landing = () => {
  const navigation = useNavigation<StackNavigation>();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await AsyncStorage.getItem('user');
        if (response) {
          const parsedResponse = JSON.parse(response);
          dispatch(setUserDetails(parsedResponse));
          navigation.navigate('Home');
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      style={[commonStyle.container, {backgroundColor: COLORS.primaryLight}]}>
      <View style={styles.push}>
        <Logo />
      </View>
      <View style={styles.mx3}>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Register')}
        />
        <Text style={commonStyle.text}>
          Already have an account?{' '}
          <Text
            style={commonStyle.boldText}
            onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Landing;

export const styles = StyleSheet.create({
  push: {
    flex: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  mx3: {width: '90%', flex: 1},
});
