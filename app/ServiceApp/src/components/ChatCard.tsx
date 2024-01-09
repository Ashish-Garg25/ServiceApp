/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

type ChatCardType = {
  subHeading: string;
  time: string;
  onPress: () => void;
};

const ChatCard = ({subHeading, time, onPress}: ChatCardType) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.image}
      />
      <View style={{flexGrow: 1}}>
        <View style={styles.wrapper}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.subText}>{time}</Text>
        </View>
        <Text style={styles.subText}>{subHeading}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  image: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 9999,
    marginRight: wp('4%'),
  },
  name: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
  },
  subText: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.grey,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
