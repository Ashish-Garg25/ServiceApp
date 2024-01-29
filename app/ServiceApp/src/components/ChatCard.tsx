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
  content: any;
};

const ChatCard = ({subHeading, time, onPress, content}: ChatCardType) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: content.profilePic,
        }}
        style={styles.image}
      />
      <View style={{flexGrow: 1}}>
        <View style={styles.wrapper}>
          <Text style={styles.name}>
            {content.firstName + ' ' + content.lastName}
          </Text>
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
