import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/color';
import Accordion from '../components/Accordion';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const HelpCenter = () => {
  const navigation = useNavigation();

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
});
