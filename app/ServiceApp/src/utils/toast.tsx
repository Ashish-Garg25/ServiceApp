/* eslint-disable react-native/no-inline-styles */
// import {View} from 'react-native';
import React from 'react';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
// import Check from '../assets/Check';
// import CloseIcon from '../assets/CloseIcon';
// import WarnIcon from '../assets/WarnIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from './color';

const ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: COLORS.lightGreen,
        borderLeftColor: COLORS.success,
        marginTop: wp('4%'),
        zIndex: 9999,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: hp('1.7%'),
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: COLORS.green,
      }}
      text2Style={{
        fontSize: hp('1.4%'),
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: COLORS.secondary,
      }}
      // renderLeadingIcon={() => (
      //   <View
      //     style={{
      //       backgroundColor: COLORS.lightGreen,
      //       width: wp('8%'),
      //       height: wp('8%'),
      //       borderRadius: 32,
      //       padding: wp('3%'),
      //       marginLeft: wp('4%'),
      //     }}>
      //     <Check />
      //   </View>
      // )}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: COLORS.lightRed,
        borderLeftColor: COLORS.danger,
        marginTop: wp('8%'),
      }}
      contentContainerStyle={{paddingHorizontal: wp('8%')}}
      text1Style={{
        fontSize: hp('1.7%'),
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: COLORS.danger,
      }}
      text2Style={{
        fontSize: hp('1.4%'),
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: COLORS.secondary,
      }}
      // renderLeadingIcon={() => (
      //   <View
      //     style={{
      //       backgroundColor: COLORS.danger,
      //       width: wp('8%'),
      //       height: wp('8%'),
      //       borderRadius: 32,
      //       padding: wp('3%'),
      //       marginLeft: wp('4%'),
      //     }}>
      //     <CloseIcon color={COLORS.lightRed} />
      //   </View>
      // )}
    />
  ),

  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: COLORS.lightYellow,
        borderLeftColor: COLORS.lightYellow,
        marginTop: wp('4%'),
      }}
      contentContainerStyle={{paddingHorizontal: wp('4%')}}
      text1Style={{
        fontSize: hp('1.7%'),
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: COLORS.lightYellow,
      }}
      text2Style={{
        fontSize: hp('1.4%'),
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: COLORS.secondary,
      }}
      // renderLeadingIcon={() => (
      //   <View
      //     style={{
      //       backgroundColor: COLORS.lightYellow,
      //       width: wp('8%'),
      //       height: wp('8%'),
      //       borderRadius: 32,
      //       padding: wp('3%'),
      //       marginLeft: wp('4%'),
      //     }}>
      //     <WarnIcon
      //       color={COLORS.lightYellow}
      //       width={wp('8%')}
      //       height={wp('6%')}
      //     />
      //   </View>
      // )}
    />
  ),
};

export default ToastConfig;
