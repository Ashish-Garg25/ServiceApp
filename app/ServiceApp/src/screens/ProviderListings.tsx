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

const RenderHeader = ({
  length,
  handleCatId,
  name,
  id,
  handleProviders,
}: any) => {
  const [show, setShow] = useState(false);

  const [filterService] = useFilterServiceMutation();

  const filterServices = async (type: {
    rating?: any;
    earning?: any;
    radius?: any;
  }) => {
    console.log('=============', name);

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
          <SearchWrapper
            handleClick={(id: any) => handleCatId(id)}
            name={name}
          />
        </View>
        <TouchableOpacity
          style={{width: wp('8%')}}
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

const ProviderListings = ({route}: any) => {
  const navigation = useNavigation<StackNavigation>();
  const [getServiceByCategory, {isLoading}] = useGetServiceByCategoryMutation();

  const [providers, setProviders] = useState([]);
  const [catId, setCatId] = useState('');

  const {id, name} = route.params;

  console.log('ddd', catId);

  useEffect(() => {
    (async () => {
      try {
        const response = await getServiceByCategory({
          category: catId !== '' ? catId : id,
        }).unwrap();
        console.log(response);
        setProviders(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [catId]);

  const handleProviders = (value: []) => setProviders(value);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Providers'}
        renderPrefix={<Back />}
        navigation={navigation}
      />

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
        ListHeaderComponent={
          <RenderHeader
            length={providers.length}
            handleCatId={(categoryId: string) => setCatId(categoryId)}
            name={name}
            id={id}
            handleProviders={handleProviders}
          />
        }
        ListEmptyComponent={RenderEmpty}
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
