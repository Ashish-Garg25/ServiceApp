import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from '../components/ScreenHeader';
import Search from '../components/Search';
import ChatCard from '../components/ChatCard';
import {COLORS} from '../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import {useGetChatListMutation} from '../redux/services';

const ChatList = () => {
  const navigation = useNavigation<StackNavigation>();

  const [getChatList] = useGetChatListMutation();

  const [allChatList, setAllChatList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getChatList({}).unwrap();
        console.log(response);
        setAllChatList(response.participants);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [getChatList]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={'Messages'} />
      <View style={{marginVertical: wp('4%'), width: wp('92%')}}>
        <Search
          placeholder={'Search for users'}
          onChangeText={e => console.log(e)}
          label={''}
          value={''}
          icon={undefined}
        />
        <View style={{marginVertical: wp('4%')}}>
          <FlatList
            data={allChatList}
            keyExtractor={(item: any) => item._id}
            renderItem={({item}) => (
              <ChatCard
                subHeading={'Need Replacement Mouse ...'}
                time={'8 hours ago'}
                onPress={() => navigation.navigate('Message', {content: item})}
                content={item}
              />
            )}
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
