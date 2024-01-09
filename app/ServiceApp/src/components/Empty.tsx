import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NotFound from '../assets/icons/NotFound';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Empty = () => {
  return (
    <View style={styles.wrapper}>
      <NotFound width={200} height={200} />
      <Text style={{marginTop: wp('2%')}}>No data found</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
