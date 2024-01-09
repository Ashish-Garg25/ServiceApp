import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Location from '../assets/icons/Location';
import Time from '../assets/icons/Time';
import Button from './Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

const PostCard = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.wrapper}>
          <Location color={COLORS.primary} />
          <Text style={styles.text}>Remote</Text>
        </View>
        <View style={[styles.wrapper, {marginVertical: wp('2%')}]}>
          <Time color={COLORS.primary} />
          <Text style={styles.text}>Tomorrow - 12:45 pm</Text>
        </View>
        <Text style={styles.mainText}>Replacement mouse required</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut ...
        </Text>
      </View>
      <View style={styles.flex}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{paddingLeft: wp('2%'), paddingRight: wp('12%')}}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.text}>Posted 2 hrs ago</Text>
        </View>
        <Button
          title={'In Progress'}
          onPress={() => console.log('www')}
          btnStyles={{
            width: wp('30%'),
            transform: [{scale: 0.9}],
            backgroundColor: COLORS.primaryLight1,
          }}
          outline
        />
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  image: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.primaryLight1,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderColor: COLORS.primary,
    padding: wp('4%'),
    marginHorizontal: wp('2%'),
  },
  name: {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('1.6%'),
    paddingLeft: wp('1%'),
    paddingBottom: wp('1%'),
  },
  text: {
    color: COLORS.secondary,
    paddingLeft: wp('1%'),
    fontSize: hp('1.6%'),
  },
  mainText: {
    fontWeight: '600',
    fontSize: hp('2%'), // 16
    lineHeight: hp('3%'), // 24
    color: 'black',
    textAlign: 'left',
    paddingVertical: wp('2%'), // 14,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.primaryLight,
    marginTop: wp('2%'),
    paddingTop: wp('3%'),
  },
});
