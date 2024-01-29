import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

// Enable layout animations on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({title, content}: any) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isCollapsed]);

  return (
    <View style={styles.mb}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text>{isCollapsed ? '+' : '-'}</Text>
        </View>
      </TouchableOpacity>

      {!isCollapsed && (
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
      )}
    </View>
  );
};

export default Accordion;

export const styles = StyleSheet.create({
  mb: {marginBottom: 10},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('4%'),
    backgroundColor: COLORS.primaryLight,
    borderRadius: 5,
    width: wp('90%'),
  },
  title: {
    fontWeight: '500',
    fontSize: hp('1.8%'),
  },
  content: {
    padding: wp('4%'),
    backgroundColor: COLORS.white,
  },
});
