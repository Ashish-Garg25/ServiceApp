import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/color';
import Empty from '../components/Empty';
import Button from '../components/Button';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {StackNavigation} from '../helpers/interfaces';
import AddressCard from '../components/AddressCard';
import {useGetAddressMutation} from '../redux/services';

const RenderEmpty = () => {
  return <Empty />;
};

const SavedAddress = () => {
  const navigation = useNavigation<StackNavigation>();

  const [getAddress] = useGetAddressMutation();

  const [address, setAddress] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAddress({}).unwrap();
        console.log('gggg', response);
        setAddress(response.address);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Saved Address'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <FlatList
        data={address}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) => (
          <AddressCard content={item} navigation={navigation} />
        )}
        ListEmptyComponent={RenderEmpty}
      />
      <Button
        title={'Add New Address'}
        onPress={() => navigation.navigate('ManageAddress')}
        btnStyles={{width: wp('92%'), marginVertical: wp('4%')}}
      />
    </SafeAreaView>
  );
};

export default SavedAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
