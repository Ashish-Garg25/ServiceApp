/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from '../components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import Back from '../assets/icons/Back';
import {COLORS} from '../utils/color';
import {commonStyle} from '../helpers/commonStyles';
import ProviderCard from '../components/ProviderCard';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {StackNavigation} from '../helpers/interfaces';
import {
  useFilterServiceMutation,
  useGetServiceByCategoryMutation,
} from '../redux/services';
import Loading from '../components/Loading';
import Empty from '../components/Empty';
import FilterIcon from '../assets/icons/FilterIcon';
import FilterSheet from '../components/FilterSheet';
import SearchWrapper from '../components/SearchWrapper';
import {useSelector} from 'react-redux';

const RenderHeader = ({length, name, id, handleProviders}: any) => {
  const [show, setShow] = useState(false);

  const [filterService] = useFilterServiceMutation();

  const filterServices = async (type: {
    rating?: any;
    earning?: any;
    radius?: any;
  }) => {
    try {
      const response = await filterService({
        category: id,
        rating: type.rating.value,
        earning: type.earning.value,
        radius: type.radius.value,
      }).unwrap();

      console.log(response);
      handleProviders(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.wrapper}>
        <View style={{width: wp('80%')}}>
          <SearchWrapper name={name} />
        </View>
        <TouchableOpacity
          style={{
            width: wp('8%'),
            height: wp('8%'),
            paddingVertical: wp('1.5%'),
            paddingHorizontal: wp('1.5%'),
          }}
          onPress={() => setShow(true)}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <Text style={[commonStyle.heading, styles.ml0, {marginTop: wp('8%')}]}>
        Search Results
      </Text>
      <Text style={[commonStyle.subHeading, styles.ml0, styles.mb2]}>
        {length === 1 ? `${length} Provider` : `${length} Providers`}
      </Text>

      <FilterSheet
        isVisible={show}
        handleVisibility={() => setShow(false)}
        handleClick={value => filterServices(value)}
      />
    </View>
  );
};

const RenderEmpty = () => {
  return <Empty />;
};

const ProviderListings = () => {
  const navigation = useNavigation<StackNavigation>();
  const {singleCategory} = useSelector((state: any) => state.category);
  const [getServiceByCategory, {isLoading}] = useGetServiceByCategoryMutation();

  const [providers, setProviders] = useState([]);

  // const {id, name} = route.params;

  useEffect(() => {
    (async () => {
      try {
        const response = await getServiceByCategory({
          category: singleCategory?._id,
        }).unwrap();
        console.log(response);
        setProviders(response);
      } catch (error) {
        console.log('err ==', error);
      }
    })();
  }, [singleCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Providers'}
        renderPrefix={<Back />}
        navigation={navigation}
      />

      <RenderHeader length={0} name={''} id={''} navigation={navigation} />

      <FlatList
        data={providers}
        renderItem={({item}: any) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProviderDetails', {id: item.service._id})
            }>
            <ProviderCard details={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={isLoading ? <Loading /> : RenderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProviderListings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: wp('100%'),
  },
  ml0: {
    marginLeft: 0,
    paddingTop: wp('1%'),
  },
  mb2: {
    marginBottom: wp('4%'),
    fontWeight: '400',
  },
  header: {width: wp('92%'), marginTop: wp('8%'), alignSelf: 'center'},
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('92%'),
  },
});
