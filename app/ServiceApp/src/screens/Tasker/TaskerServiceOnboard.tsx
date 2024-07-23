/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Benefits from '../../assets/icons/Benefits';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../helpers/interfaces';

const TaskerServiceOnboard = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Benefits width={200} height={200} />
        <Text style={[styles.name, {marginTop: wp('4%')}]}>
          Add Your Service
        </Text>
        <Text
          style={[
            styles.label,
            {textAlign: 'center', marginTop: wp('2%'), width: wp('92%')},
          ]}>
          Add your service that you intend to offer. Only one service can be
          added at the moment
        </Text>
      </View>
      <Button
        title={'Add Service'}
        btnStyles={{width: wp('92%'), marginBottom: wp('20%')}}
        onPress={() => navigation.navigate('TaskerService')}
      />
    </View>
  );
};

export default TaskerServiceOnboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  label: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.secondary,
  },
  name: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
});
