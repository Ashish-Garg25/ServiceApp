import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import Search from '../components/Search';
import ChatCard from '../components/ChatCard';
import {COLORS} from '../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';

const ChatList = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={'Messages'} />
      <View style={{marginVertical: wp('4%'), width: wp('92%')}}>
        <Search
          placeholder={"Search for 'AC Service'"}
          onChangeText={e => console.log(e)}
          label={''}
          value={''}
          icon={undefined}
        />
        <View style={{marginVertical: wp('4%')}}>
          <ChatCard
            subHeading={'Need Replacement Mouse ...'}
            time={'8 hours ago'}
            onPress={() => navigation.navigate('Message')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
