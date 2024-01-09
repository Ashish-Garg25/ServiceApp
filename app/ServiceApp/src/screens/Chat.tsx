/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const Chat = () => {
  const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState<null | number>(null);

  const [offer, setOffer] = useState({taskStartDate: new Date(), price: '0'});

  const [offerSent, setOfferSent] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.main, styles.wrapper, {marginLeft: wp('4%')}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <View style={[styles.wrapper, {marginLeft: wp('4%')}]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{flexGrow: 1}}>
            <Text style={styles.name}>John Doe </Text>
            <Text style={styles.subText}>{'12:30 am'}</Text>
          </View>
          <Button
            title="Hire"
            btnStyles={{
              width: wp('20%'),
              marginRight: wp('8%'),
              paddingVertical: wp('2%'),
            }}
            onPress={() => setShow(true)}
          />
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
                  John Doe{' '}
                  <Text style={{fontWeight: '400', fontSize: hp('1.4%')}}>
                    {' '}
                    03:00 pm
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subText,
                    {fontSize: hp('1.7%'), color: '#000', paddingTop: wp('1%')},
                  ]}>
                  This is a test message
                </Text>
              </View>
            </View>
          </View>
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
                  03:00 pm
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
                    This is a test message
                  </Text>
                </View>
              </View>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={[
                  styles.image,
                  {marginRight: wp(0), marginLeft: wp('4%')},
                ]}
                resizeMode="cover"
              />
            </View>
          </View>

          {offerSent && (
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                borderRadius: wp('2%'),
                alignSelf: 'flex-end',
                marginTop: wp('1%'),
                marginRight: wp('13%'),
              }}>
              <Text
                style={[
                  styles.subText,
                  {
                    fontSize: hp('1.7%'),
                    color: '#000',
                  },
                ]}>
                Sarah would like to hire you for their project -{' '}
                <Text style={styles.boldText}>Need Home Cleaning Service</Text>
              </Text>
              <Text style={styles.boldText}>Price - $500</Text>
              <Text style={styles.boldText}>Time - Jan 1st 2024, 11:35 pm</Text>
              <Button
                outline
                title="View Offer"
                btnStyles={{
                  paddingVertical: wp('2%'),
                  width: wp('30%'),
                  marginTop: wp('4%'),
                }}
                onPress={() => console.log('www')}
              />
            </View>
          )}
        </View>

        <MessageInput />
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
              <View style={{marginBottom: wp('4%')}} />
              <Button
                title="Send Offer"
                onPress={() => {
                  setShow(false);
                  setOfferSent(true);
                }}
              />
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
