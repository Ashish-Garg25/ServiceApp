import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import category from '../redux/slices/category';

type CategoryType = {
  item: {
    _id: string;
    name: string;
    image: string;
  };
  navigation: any;
};

const ServiceCard = ({item, navigation}: CategoryType) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{margin: wp('1.8%')}}
      onPress={() => {
        dispatch(
          category.actions.setSingleCategory({_id: item._id, name: item.name}),
        );
        navigation.navigate('Providers');
      }}>
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
