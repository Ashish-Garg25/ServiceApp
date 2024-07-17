/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {commonStyle} from '../helpers/commonStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ServiceCard from '../components/ServiceCard';
import {COLORS} from '../utils/color';
import {useGetCategoryMutation} from '../redux/services';
import {useNavigation} from '@react-navigation/native';
import {setCategory} from '../redux/slices/category';
import {useDispatch, useSelector} from 'react-redux';
import MainHeader from '../components/MainHeader';
import SearchWrapper from '../components/SearchWrapper';

const Home = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {categories} = useSelector((state: any) => state.category);

  const [getCategory] = useGetCategoryMutation();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCategory({}).unwrap();
        dispatch(setCategory(res.category));
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={commonStyle.container}>
      <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="always">
        <View style={styles.card}>
          <MainHeader navigation={navigation} />

          <View>
            <Text style={styles.text}>Good Evening Ashish!</Text>
            <Text style={styles.subText}>What are you looking for?</Text>
          </View>

          <View style={styles.wrapper}>
            <SearchWrapper
              handleClick={(value: any) =>
                navigation.navigate('Providers', {
                  id: value._id,
                  name: value.name,
                })
              }
            />

            <FlatList
              data={[...categories].splice(0, 6)}
              renderItem={({item}) => (
                <ServiceCard item={item} navigation={navigation} />
              )}
              numColumns={3}
              style={{marginTop: wp('6%')}}
              columnWrapperStyle={{
                justifyContent: 'space-evenly',
                alignSelf: 'flex-start',
              }}
            />
          </View>

          <Image
            source={{
              uri: 'https://images.hindustantimes.com/tech/img/2023/07/25/original/afec2009-0cf1-4f08-9423-eee5386e7805.__V1____1690289777435.jpg',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <View style={[styles.wrapper, {marginBottom: wp('4%')}]}>
            <Text style={[styles.secondaryText]}>Most Booked Services</Text>

            <FlatList
              data={[...categories].splice(6, 12)}
              renderItem={({item}) => (
                <ServiceCard item={item} navigation={navigation} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: wp('4%')}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    width: wp('92%'),
    alignSelf: 'center',
    marginTop: wp('8%'),
  },
  card: {
    borderBottomWidth: 8,
    borderBlockColor: COLORS.primaryLight,
    width: wp('100%'),
  },
  text: {
    fontWeight: '600',
    fontSize: hp('3%'), // 16
    lineHeight: hp('3%'), // 24
    color: 'black',
    textAlign: 'left',
    paddingTop: wp('3%'), // 14,
    marginLeft: wp('4%'),
  },
  subText: {
    fontWeight: '500',
    fontSize: hp('1.6%'), // 16
    lineHeight: hp('2.4%'), // 24
    color: COLORS.secondary,
    textAlign: 'left',
    paddingTop: wp('2%'), // 14,
    paddingRight: wp('12%'),
    marginLeft: wp('4%'),
  },
  secondaryText: {
    fontWeight: '600',
    fontSize: hp('2%'), // 16
    lineHeight: hp('2%'), // 24
    color: 'black',
    textAlign: 'left',
  },
  image: {
    width: wp('100%'),
    height: wp('40%'),
    marginTop: wp('6%'),
    alignSelf: 'center',
    // borderRadius: 16,
  },
});
