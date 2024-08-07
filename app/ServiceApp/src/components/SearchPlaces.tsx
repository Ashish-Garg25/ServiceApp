import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Location from '../assets/icons/Location';
import Add from '../assets/icons/Add';
import {NavigationProp} from '@react-navigation/native';
import Back from '../assets/icons/Back';
import Button from './Button';
import {requestLocation} from '../helpers/helpers';

type BottomSheetType = {
  isVisible: boolean;
  handleVisibility: () => void;
  handleLocation: (value: string) => void;
  navigation: NavigationProp<any>;
};

const SearchPlaces = ({
  isVisible,
  handleVisibility,
  handleLocation,
  navigation,
}: BottomSheetType) => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      try {
        requestLocation((formattedAddress: string) => {
          setLocation(formattedAddress as any);
          handleLocation(formattedAddress as any);
        });
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleVisibility()}>
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity style={styles.header} onPress={handleVisibility}>
          <Back />
          <Text style={styles.heading}>Select a location</Text>
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder="Search area, street name .."
          onPress={(data: any, details: any) => {
            console.log('data ====', data, details);
            setLocation(data.description);
            handleLocation(data.description);
          }}
          query={{
            key: 'AIzaSyALXQL_Sn6aM-gxI3eqAEBhsBMV3tZGFY0',
            language: 'en',
            components: 'country:ca',
            types: 'address',
          }}
          styles={{
            container: {
              alignItems: 'center',
              height: 'auto',
              elevation: 6,
              zIndex: 999999,
            },
            textInput: {
              height: 50,
              color: 'black',
              fontSize: hp('1.6%'),
              borderRadius: 9999,
              paddingLeft: wp('7%'),
              backgroundColor: COLORS.primaryLight,
              marginTop: wp('8%'),
            },
            listView: {
              zIndex: 9999,
              elevation: 6,
              marginHorizontal: wp('4%'),
            },
            poweredContainer: {
              display: 'none',
            },
          }}
          renderDescription={row => row.structured_formatting.main_text}
          // textInputProps={{
          //   InputComp: Input,
          // }}
        />
        <View style={styles.wrapper}>
          <View style={styles.locationWrapper}>
            <Location />
            <View style={{marginLeft: wp('2%')}}>
              <Text style={styles.label}>Selected Address</Text>
              <Text style={styles.value}>{location}</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.primaryLight,
              width: wp('82%'),
              height: wp('0.2%'),
              marginVertical: wp('4%'),
            }}
          />
          <TouchableOpacity
            style={[styles.locationWrapper, styles.align]}
            onPress={() => navigation.navigate('SavedAddress')}>
            <Add />
            <Text style={{color: COLORS.primary, paddingLeft: wp('2%')}}>
              Add Address Manually
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Save"
          btnStyles={{width: wp('92%')}}
          onPress={handleVisibility}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default SearchPlaces;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp('4%'),
    alignSelf: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: wp('4%'),
    paddingBottom: wp('8%'),
    elevation: 4,
    zIndex: 0,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: -8},
    width: wp('100%'),
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: COLORS.primaryLight1,
    padding: wp('4%'),
    borderRadius: 16,
    position: 'absolute',
    top: wp('52%'),
    width: wp('92%'),
  },
  locationWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  label: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.grey,
    paddingBottom: wp('1%'),
  },
  value: {
    fontSize: hp('1.7%'),
    fontWeight: '600',
    width: wp('80%'),
  },
  align: {alignSelf: 'flex-start'},
});
