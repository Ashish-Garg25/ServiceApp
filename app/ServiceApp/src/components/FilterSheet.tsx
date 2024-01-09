import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Slider from '@react-native-community/slider';
import Button from './Button';
import Close from '../assets/icons/Close';

type BottomSheetType = {
  isVisible: boolean;
  handleVisibility: () => void;
  handleClick: (value: {}) => void;
};

const FilterSheet = ({
  isVisible,
  handleVisibility,
  handleClick,
}: BottomSheetType) => {
  const [filterValues, setFilterValues] = useState({});

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => handleVisibility()}>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.mainHeading}>Filter By</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => handleVisibility()}>
            <Close fill={COLORS.grey} />
          </TouchableOpacity>

          <View style={styles.wrapper}>
            <Text style={styles.text}>Rating</Text>

            <Slider
              style={{width: wp('92%'), height: hp('2%')}}
              minimumValue={1}
              maximumValue={5}
              step={1}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.primaryLight}
              onSlidingComplete={value =>
                setFilterValues({
                  ...filterValues,
                  rating: {name: 'Rating', value},
                })
              }
            />
            <View style={[styles.mainWrapper, {width: wp('90%')}]}>
              <Text style={{marginLeft: wp('3%')}}>1</Text>
              <Text>2</Text>
              <Text>3</Text>
              <Text>4</Text>
              <Text>5</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Earnings</Text>

            <Slider
              style={{width: wp('92%'), height: hp('2%')}}
              minimumValue={1}
              maximumValue={3}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.primaryLight}
              onSlidingComplete={value =>
                setFilterValues({
                  ...filterValues,
                  earning: {name: 'Earnings', value},
                })
              }
            />
            <View style={styles.mainWrapper}>
              <Text>Lowest</Text>
              <Text>Highest</Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Radius</Text>
            <Slider
              style={{width: wp('92%'), height: hp('2%')}}
              minimumValue={10}
              maximumValue={500}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.primaryLight}
              onSlidingComplete={value =>
                setFilterValues({
                  ...filterValues,
                  radius: {name: 'Radius', value},
                })
              }
            />
            <View style={styles.mainWrapper}>
              <Text>10m</Text>
              <Text>500m</Text>
            </View>
          </View>

          <Button
            title="Search"
            btnStyles={{marginTop: wp('6%'), width: wp('92%')}}
            onPress={() => {
              handleVisibility();
              handleClick(filterValues);
            }}
          />
        </ScrollView>
      </Modal>
    </View>
  );
};

export default FilterSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: wp('4%'),
    paddingBottom: wp('8%'),
    elevation: 6,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: -8},
    position: 'absolute',
    bottom: wp('0%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: hp('1.6%'),
    lineHeight: hp('2.3%'),
    paddingLeft: wp('2%'),
    color: COLORS.secondary,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: wp('6%'),
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: wp('6%'),
    width: wp('92%'),
    borderBottomWidth: 1,
    borderBlockColor: COLORS.lightGreen,
  },
  mainHeading: {
    fontSize: hp('1.7%'),
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: wp('2%'),
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: hp('1.7%'),
    color: COLORS.primary,
    fontWeight: '600',
  },
  text: {
    fontSize: hp('1.5%'),
    color: COLORS.secondary,
    fontWeight: '400',
    paddingTop: wp('1%'),
    lineHeight: 18,
  },
  mainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('92%'),
  },
  close: {
    position: 'absolute',
    right: 24,
    top: 24,
  },
});
