import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

const Dropdown = ({handleDropdown, customStyles, dropdownListContent}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => handleDropdown(false)}
      />
      <View style={[styles.modalContentList, customStyles]}>
        <FlatList
          data={dropdownListContent}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleDropdown(item)}>
              <Text style={styles.text}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {position: 'relative', zIndex: 999999},
  wrapper: {
    width: wp('200%'),
    height: hp('200%'),
    position: 'absolute',
    top: wp('-100%'),
    left: wp('-100%'),
  },
  modalContentList: {
    width: wp('92%'),
    backgroundColor: COLORS.white,
    elevation: 6,
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: -1},
    borderRadius: 8,
    position: 'absolute',
    left: wp('0'),
    top: wp('1%'),
    zIndex: 999999,
  },
  dropdownItem: {
    padding: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGreen,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: hp('1.6%'),
  },
});
