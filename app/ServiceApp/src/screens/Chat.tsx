/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/color';
import Back from '../assets/icons/Back';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MessageInput from '../components/MessageInput';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import Input from '../components/Input';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Dollar from '../assets/icons/Dollar';
import Time from '../assets/icons/Time';
import Close from '../assets/icons/Close';
import {
  useCreateOfferMutation,
  useGetChatMutation,
  useGetOfferMutation,
  useSendMessageMutation,
} from '../redux/services';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const Sender = ({content}: any) => {
  return (
    <View
      style={{
        width: wp('92%'),
        paddingVertical: wp('3%'),
      }}>
      <View style={[styles.wrapper, {justifyContent: 'center'}]}>
        <View style={{flexGrow: 1}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: hp('1.4%'),
              textAlign: 'right',
            }}>
            {' '}
            {moment(content.createdAt).format('hh:mm a')}
          </Text>
          <View
            style={{
              backgroundColor: COLORS.primaryLight1,
              padding: wp('2%'),
              borderRadius: wp('2%'),
              alignSelf: 'flex-end',
              marginTop: wp('1%'),
            }}>
            <Text
              style={[
                styles.subText,
                {
                  fontSize: hp('1.7%'),
                  color: '#000',
                },
              ]}>
              {content.content}
            </Text>
          </View>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={[styles.image, {marginRight: wp(0), marginLeft: wp('4%')}]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const Receiver = ({content, user}: any) => {
  return (
    <View
      style={{
        width: wp('92%'),
        paddingVertical: wp('3%'),
      }}>
      <View style={styles.wrapper}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.image}
        />
        <View style={{flexGrow: 1}}>
          <Text style={[styles.name, {fontSize: hp('1.6%')}]}>
            {`${user.firstName} ${user.lastName}`}{' '}
            <Text style={{fontWeight: '400', fontSize: hp('1.4%')}}>
              {' '}
              {moment(content.createdAt).format('hh:mm a')}
            </Text>
          </Text>
          <Text
            style={[
              styles.subText,
              {fontSize: hp('1.7%'), color: '#000', paddingTop: wp('1%')},
            ]}>
            {content.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

const SentOffer = ({user, offerSent}: any) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.lightGreen,
        padding: wp('2%'),
        borderRadius: wp('2%'),
        alignSelf: 'flex-end',
        marginTop: wp('1%'),
        marginBottom: wp('4%'),
        marginLeft: wp('13%'),
      }}>
      <Text
        style={[
          styles.subText,
          {
            fontSize: hp('1.7%'),
            color: '#000',
          },
        ]}>
        {user.firstName} would like to hire you for their project -{' '}
        <Text style={styles.boldText}>Need Home Cleaning Service</Text>
      </Text>
      <Text style={styles.boldText}>Fixed Price - ${offerSent.rate}</Text>
      <Text style={styles.boldText}>
        Time - {moment(offerSent.startDate).format('MMMM Do YYYY, h:mm:ss a')}
      </Text>
      <Button
        outline
        title="Cancel Offer"
        btnStyles={{
          paddingVertical: wp('2%'),
          width: wp('30%'),
          marginTop: wp('4%'),
          marginBottom: wp('2%'),
          alignSelf: 'flex-end',
          borderColor: COLORS.red,
          backgroundColor: COLORS.red,
        }}
        textStyles={{color: COLORS.white}}
        onPress={() => console.log('www')}
      />
    </View>
  );
};

const Chat = ({route}: any) => {
  const [getChat] = useGetChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const [createOffer] = useCreateOfferMutation();
  const [getOffer] = useGetOfferMutation();

  const navigation = useNavigation();

  const user = useSelector((state: any) => state.user);

  const {content} = route.params;

  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState<null | number>(null);
  const [chatContent, setChatContent] = useState('');

  const [offer, setOffer] = useState({
    taskStartDate: new Date(),
    price: '0',
    additionalInfo: '',
  });
  const [offerSent, setOfferSent] = useState<any>({});

  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChatMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getOffer({sellerId: content._id}).unwrap();
        setOfferSent(response[0]);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChatMessages = async () => {
    try {
      const response = await getChat({id: content._id}).unwrap();
      setChats(response.chat);
    } catch (err) {
      console.log(err);
    }
  };

  const send = async () => {
    try {
      const payload = JSON.stringify({
        sender: user._id,
        receiver: content._id,
        content: chatContent,
      });

      const response = await sendMessage(payload).unwrap();
      console.log(response);

      if (response.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Message sent successfully',
        });
        getChatMessages();
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setChatContent('');
    }
  };

  const sendOffer = async () => {
    console.log('ggg');
    try {
      const payload = JSON.stringify({
        buyerId: user._id,
        service: '657f3b13cc9feb5f8a36779d',
        sellerId: content._id,
        startDate: offer.taskStartDate,
        rate: offer.price,
        additionalInfo: offer.additionalInfo,
      });
      const response = await createOffer(payload).unwrap();

      console.log(response);

      if (response.variant === 'success') {
        setShow(false);
        setOfferSent(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.main, styles.wrapper, {marginLeft: wp('4%')}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View style={[styles.wrapper, {marginLeft: wp('4%')}]}>
          <Image
            source={{
              uri: content.profilePic,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{flexGrow: 1}}>
            <Text style={styles.name}>
              {content.firstName + ' ' + content.lastName}
            </Text>
            <Text style={styles.subText}>
              {moment(Date()).format('hh:mm a')}
            </Text>
          </View>
          {Object.values(offerSent).length === 0 && (
            <Button
              title="Hire"
              btnStyles={{
                width: wp('20%'),
                marginRight: wp('8%'),
                paddingVertical: wp('2%'),
              }}
              onPress={() => setShow(true)}
            />
          )}
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          width: wp('100%'),
          padding: wp('4%'),
          flexGrow: 1,
        }}>
        <View style={{flexGrow: 1}}>
          {Object.values(offerSent).length > 0 && (
            <SentOffer user={user} offerSent={offerSent} />
          )}

          <FlatList
            data={chats}
            keyExtractor={(item: any) => item._id}
            renderItem={({item}) =>
              item.sender === user._id ? (
                <Sender content={item} />
              ) : (
                <Receiver content={item} user={content} />
              )
            }
          />
        </View>

        <MessageInput
          onChangeText={(e: string) => setChatContent(e)}
          onPress={send}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('92%'),
              paddingVertical: wp('2%'),
            }}>
            <Text style={{fontSize: hp('1.7%'), fontWeight: '600'}}>
              Create Offer
            </Text>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Close fill={COLORS.grey} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <View>
              <Input
                label="Fixed Price ($)"
                placeholder="$0.000"
                value={offer.price}
                icon={<Dollar />}
                onChangeText={e => setOffer({...offer, price: e})}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log('red');
                  setIsOpen(1);
                }}>
                <View pointerEvents="none">
                  <Input
                    label="Select Date & Time"
                    placeholder="DD-MM-YY"
                    value={moment(offer.taskStartDate).format(
                      'MMMM Do YYYY, h:mm a',
                    )}
                    onChangeText={() =>
                      setOffer({...offer, taskStartDate: new Date()})
                    }
                    icon={<Time />}
                    caretHidden
                  />
                </View>
              </TouchableOpacity>

              <DatePicker
                modal
                open={isOpen === 1}
                date={offer.taskStartDate}
                onConfirm={date => {
                  setIsOpen(1);
                  setOffer({...offer, taskStartDate: date});
                }}
                onCancel={() => {
                  setIsOpen(null);
                }}
              />

              <Input
                label="Additional Information"
                placeholder="Write here .."
                value={offer.additionalInfo}
                onChangeText={(e: string) =>
                  setOffer({...offer, additionalInfo: e})
                }
                bordered
                multiline
                numberOfLines={4}
                inputStyles={{height: hp('15%'), paddingTop: wp('4%')}}
              />

              <View style={{marginBottom: wp('4%')}} />
              <Button title="Send Offer" onPress={sendOffer} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp('16%'),
  },
  main: {
    paddingVertical: wp('2%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: 9999,
    marginRight: wp('4%'),
  },
  name: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
  },
  subText: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.grey,
  },
  boldText: {
    fontSize: hp('1.7%'),
    fontWeight: '600',
    color: COLORS.black,
    paddingTop: wp('2%'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: wp('4%'),
    paddingBottom: wp('8%'),
    elevation: 6,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: -8},
    position: 'absolute',
    bottom: wp('0%'),
    width: wp('100%'),
    alignItems: 'center',
  },
});
