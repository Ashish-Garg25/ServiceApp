import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ActionCard from '../../components/ActionCard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../helpers/interfaces';
import {COLORS} from '../../utils/color';
import ScreenHeader from '../../components/ScreenHeader';
import Back from '../../assets/icons/Back';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Accordion from '../../components/Accordion';

const ACTIONS = [
  {
    title: 'Guidelines',
    type: 'deepLink',
    link: 'https://mrtasker.com/',
  },
  {
    title: 'Terms and conditions',
    link: 'Terms',
  },
  {
    title: 'Privacy Policy',
    link: 'Terms',
  },
];
const About = () => {
  const navigation = useNavigation<StackNavigation>();

  const goTo = async (link: string) => {
    try {
      await Linking.openURL(link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.alignContent}>
        <ScreenHeader
          title="Account Settings"
          navigation={navigation}
          renderPrefix={<Back />}
        />

        <View style={{marginTop: wp('4%')}} />
        <Text style={styles.text}>Policies & Guidelines</Text>
        {ACTIONS.map(({title, link, type}) => (
          <ActionCard
            icon={null}
            title={title}
            onPress={() =>
              type === 'deepLink'
                ? goTo(link)
                : link && navigation.navigate(link as never)
            }
          />
        ))}

        <View style={{marginTop: wp('6%')}} />
        <Text style={styles.text}>FAQs</Text>
        <Accordion title="Section 1" content="Content for Section 1" />
        <Accordion title="Section 1" content="Content for Section 1" />
        <Accordion title="Section 1" content="Content for Section 1" />
        <Accordion title="Section 1" content="Content for Section 1" />
        <Accordion title="Section 1" content="Content for Section 1" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: hp('2.4%'),
    alignSelf: 'flex-start',
    marginVertical: wp('4%'),
    marginLeft: wp('6%'),
  },
  alignContent: {alignItems: 'center'},
});
