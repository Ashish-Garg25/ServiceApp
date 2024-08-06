import {Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/color';
import Accordion from '../components/Accordion';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HelpCenter = () => {
  const navigation = useNavigation();

  const openUrl = async () => {
    try {
      await Linking.openURL('mailto:sales@mrtasker.com');
    } catch (err) {
      console.log(err);
    }
  };

  const openCall = async () => {
    try {
      await Linking.openURL('tel:+10223212234');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Help Center'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <View style={{marginTop: wp('6%')}} />
      <Accordion title="Section 1" content="Content for Section 1" />
      <Accordion title="Section 1" content="Content for Section 1" />
      <Accordion title="Section 1" content="Content for Section 1" />
      <Accordion title="Section 1" content="Content for Section 1" />
      <Accordion title="Section 1" content="Content for Section 1" />

      <View style={styles.wrapper}>
        <Text style={styles.text}>
          Email Us at{' '}
          <Text style={styles.fwBold} onPress={openUrl}>
            sales@mrtasker.com
          </Text>
        </Text>
        <Text style={styles.text} onPress={openCall}>
          Contact Us at <Text style={styles.fwBold}>+1 022 321 2234</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: wp('16%'),
  },
  text: {
    fontSize: hp('1.7%'),
    paddingBottom: wp('4%'),
    color: COLORS.grey,
  },
  fwBold: {
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
});
