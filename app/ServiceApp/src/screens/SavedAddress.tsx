import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import Empty from '../components/Empty';
import Button from '../components/Button';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {StackNavigation} from '../helpers/interfaces';
import AddressCard from '../components/AddressCard';

const SavedAddress = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Saved Address'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <AddressCard navigation={navigation} />
      <Empty />
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
