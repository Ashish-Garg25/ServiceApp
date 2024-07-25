/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';
import Input from './Input';
import Button from './Button';
import {useRateServiceMutation} from '../redux/services';

const GiveRating = ({item}: any) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const [rateService] = useRateServiceMutation();

  const rate = async () => {
    try {
      if (item.serviceDetails) {
        const payload = JSON.stringify({
          service: item?.serviceDetails[0]?._id,
          rating,
          content,
        });

        const response = await rateService(payload).unwrap();
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper} onPress={() => setShow(true)}>
        <Text style={styles.text}>Rate their service</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}>
        <TouchableOpacity
          style={{
            flex: 1,
            position: 'absolute',
            height: hp('50%'),
            width: wp('100%'),
            zIndex: 99,
          }}
          onPress={() => setShow(false)}
        />
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.3)'}}>
          <View style={styles.modalWrapper}>
            <Text style={styles.mainText}>
              How did you like this provider's service ?
            </Text>
            <StarRating
              rating={rating}
              onChange={setRating}
              style={{marginBottom: wp('2%')}}
              starSize={wp('10%')}
              color={COLORS.green}
            />

            <Input
              label="Description"
              placeholder="Write here .."
              value={content}
              onChangeText={(e: string) => setContent(e)}
              bordered
              multiline
              numberOfLines={4}
              inputStyles={{height: hp('15%'), paddingTop: wp('4%')}}
            />
            <Button
              title={'Rate Service'}
              onPress={rate}
              btnStyles={{
                width: wp('90%'),
                backgroundColor: COLORS.green,
                marginTop: wp('4%'),
              }}
              disabled={rating === 0 || content === ''}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GiveRating;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  wrapper: {
    backgroundColor: COLORS.primaryLight,
    width: wp('80%'),
    padding: wp('4%'),
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: wp('4%'),
    bottom: 0,
  },
  mainText: {
    fontSize: hp('3%'),
    color: COLORS.black,
    paddingVertical: wp('4%'),
    paddingBottom: wp('8%'),
  },
  text: {
    fontSize: hp('2%'),
    color: COLORS.primary,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: wp('4%'),
    zIndex: 9999,
    marginTop: hp('50%'),
    elevation: 10,
  },
});
