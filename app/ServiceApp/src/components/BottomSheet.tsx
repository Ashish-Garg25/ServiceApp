import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Lock from '../assets/icons/Lock';
import Benefits from '../assets/icons/Benefits';
import Button from './Button';

type BottomSheetType = {
  isVisible: boolean;
  handleVisibility: () => void;
  handleClick: () => void;
};

const BottomSheet = ({
  isVisible,
  handleVisibility,
  handleClick,
}: BottomSheetType) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => handleVisibility()}>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Benefits width={200} height={200} />
          <Text style={styles.mainWrapper}>
            Thank you for showing interest in Sam's Profile. We ask that you
            kindly post a task before engaging with the provider
          </Text>

          <Text style={styles.mainHeading}>Benefits of Posting a Task</Text>
          <View style={styles.wrapper}>
            <Lock />
            <View style={{paddingLeft: wp('2%')}}>
              <Text style={styles.heading}>Payment Protection</Text>
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Text>
            </View>
          </View>
          <View style={styles.wrapper}>
            <Lock />
            <View style={{paddingLeft: wp('2%')}}>
              <Text style={styles.heading}>Payment Protection</Text>
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Text>
            </View>
          </View>
          <View style={[styles.wrapper, {marginBottom: wp('6%')}]}>
            <Lock />
            <View style={{paddingLeft: wp('2%')}}>
              <Text style={styles.heading}>Payment Protection</Text>
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Text>
            </View>
          </View>

          <Button
            title="Got It"
            btnStyles={{width: wp('92%')}}
            onPress={handleClick}
          />
        </ScrollView>
      </Modal>
    </View>
  );
};

export default BottomSheet;

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('6%'),
  },
  mainHeading: {
    fontSize: hp('1.7%'),
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: wp('8%'),
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
    fontSize: hp('1.5%'),
    textAlign: 'center',
    marginTop: wp('4%'),
  },
});
