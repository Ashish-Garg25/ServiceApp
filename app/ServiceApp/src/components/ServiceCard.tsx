import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type CategoryType = {
  item: {
    _id: string;
    name: string;
    image: string;
  };
  navigation: any;
};

const ServiceCard = ({item, navigation}: CategoryType) => {
  return (
    <TouchableOpacity
      style={{margin: wp('1.8%')}}
      onPress={() =>
        navigation.navigate('Providers', {id: item._id, name: item.name})
      }>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  image: {
    width: wp('27%'),
    height: wp('24%'),
    borderRadius: 16,
  },
  text: {
    fontSize: hp('1.5%'),
    paddingTop: wp('2%'),
    width: wp('24%'),
  },
});
