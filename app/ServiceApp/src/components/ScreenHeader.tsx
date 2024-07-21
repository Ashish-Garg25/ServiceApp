import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationProp} from '@react-navigation/native';

type ScreenHeaderType = {
  title: string;
  renderPrefix?: React.ReactElement;
  renderSuffix?: React.ReactElement;
  navigation?: NavigationProp<any>;
};

const ScreenHeader = ({
  title,
  renderPrefix,
  renderSuffix,
  navigation,
}: ScreenHeaderType) => {
  return (
    <View style={styles.headerWrapper}>
      {renderPrefix && (
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={{
            width: wp('8%'),
            height: wp('8%'),
            paddingHorizontal: wp('1%'),
            paddingVertical: wp('1.4%'),
          }}>
          {renderPrefix}
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          width: wp('8%'),
          height: wp('8%'),
          paddingHorizontal: wp('1%'),
          paddingVertical: wp('1.4%'),
        }}>
        {renderSuffix && renderSuffix}
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp('3%'),
    height: hp('4%'),
  },
  title: {
    fontWeight: '600',
    fontSize: hp('2.3%'),
    lineHeight: hp('3%'),
    textAlign: 'center',
    width: wp('80%'),
  },
});
