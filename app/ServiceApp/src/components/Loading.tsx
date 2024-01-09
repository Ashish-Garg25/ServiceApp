import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

const Loading = ({text}: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'small'} color={COLORS.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    textAlign: 'center',
    fontSize: hp('1.5%'),
    color: COLORS.secondary,
    paddingTop: wp('2%'),
  },
});
