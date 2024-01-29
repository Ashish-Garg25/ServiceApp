import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Input from '../components/Input';
import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import Checkbox from '../components/Checkbox';
import {useUpdateUserMutation} from '../redux/services';

// type addressType = {
//   address: string;
//   country: string;
//   city: string;
//   state: string;
//   zipCode: number;
//   isPrimary: boolean;
// };

const ManageAddress = ({route}: any) => {
  const navigation = useNavigation();

  const [updateUser] = useUpdateUserMutation();

  const [address, setAddress] = useState<any>({});

  useEffect(() => {
    if (route.params) {
      const {content} = route.params;
      console.log(content);
      setAddress({...content, address: content.address1});
    }
  }, [route.params]);

  const handleEdit = async () => {
    try {
      const response = await updateUser(address).unwrap();

      console.log('eeee', response.data.address);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Add Address'}
        renderPrefix={<Back />}
        navigation={navigation}
      />

      <View style={styles.wrapper}>
        <Input
          label={'Address'}
          onChangeText={text => setAddress({...address, address: text})}
          placeholder={'Enter Address'}
          value={address.address}
        />
        <Input
          label={'Country'}
          onChangeText={text => setAddress({...address, country: text})}
          placeholder={'Enter Country'}
          value={address.country}
        />
        <Input
          label={'State'}
          onChangeText={text => setAddress({...address, state: text})}
          placeholder={'Enter State'}
          value={address.state}
        />
        <Input
          label={'City'}
          onChangeText={text => setAddress({...address, city: text})}
          placeholder={'Enter City'}
          value={address.city}
        />
        <Input
          label={'Zip Code'}
          keyboardType={'number-pad'}
          onChangeText={text => setAddress({...address, zipCode: Number(text)})}
          placeholder={'Enter Zip Code'}
          value={String(address.zipCode) as any}
        />
        <Checkbox
          label={'Set as primary'}
          isChecked={address.isPrimary}
          onPress={() =>
            setAddress({...address, isPrimary: !address.isPrimary})
          }
        />
      </View>
      <Button
        title={'Save'}
        onPress={handleEdit}
        btnStyles={{width: wp('92%'), marginBottom: wp('4%')}}
      />
    </SafeAreaView>
  );
};

export default ManageAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 9999,
    marginBottom: wp('3%'),
    marginTop: wp('4%'),
  },
  edit: {
    color: COLORS.primary,
    fontSize: hp('1.6%'),
    fontWeight: '500',
  },
  wrapper: {
    flexGrow: 1,
  },
});
