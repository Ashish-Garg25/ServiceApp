import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetNotificationsMutation} from '../redux/services';
import {getDeviceToken} from '../helpers/helpers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import Empty from '../components/Empty';

const RenderNotifications = ({item}: any) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.date}>{item.createdAt}</Text>
    </View>
  );
};

const Notifications = () => {
  const navigation = useNavigation<any>();

  const [getNotifications] = useGetNotificationsMutation();
  const [notificationContent, setNotificationContent] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fcmToken = await getDeviceToken();
        const response = await getNotifications({token: fcmToken}).unwrap();

        setNotificationContent(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [getNotifications]);

  return (
    <View style={{width: wp('92%')}}>
      <ScreenHeader
        title={'Notifications'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <FlatList
        data={notificationContent}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={RenderNotifications}
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  wrapper: {
    padding: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    marginBottom: wp('2%'),
  },
  title: {
    fontSize: hp('1.9%'),
    color: COLORS.black,
    lineHeight: wp('2.2%'),
    fontFamily: 'Lato-Bold',
  },
  content: {
    fontSize: hp('1.75%'),
    color: COLORS.secondary,
    lineHeight: wp('2.1%'),
    fontFamily: 'Lato-Regular',
  },
  date: {
    fontSize: hp('1.6%'),
    color: COLORS.secondary,
    lineHeight: wp('2.1%'),
    fontFamily: 'Lato-Regular',
  },
});
