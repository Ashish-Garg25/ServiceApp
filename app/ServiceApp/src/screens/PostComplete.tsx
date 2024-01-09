import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ScreenHeader from '../components/ScreenHeader';
import Input from '../components/Input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import Button from '../components/Button';
import Back from '../assets/icons/Back';
import RadioBox from '../components/RadioBox';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

type TaskPostType = {
  title: string;
  taskStartDate: Date;
};

const PostComplete = () => {
  const [taskPost, setTaskPost] = useState<TaskPostType>({
    title: '',
    taskStartDate: new Date(),
  });
  const [isOpen, setIsOpen] = useState<null | number>(null);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Post a Task'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <View style={styles.mainWrapper}>
        <TouchableOpacity
          onPress={() => {
            console.log('red');
            setIsOpen(1);
          }}>
          <View pointerEvents="none">
            <Input
              label="Select Date & Time"
              placeholder="DD-MM-YY"
              value={moment(taskPost.taskStartDate).format(
                'MMMM Do YYYY, h:mm a',
              )}
              onChangeText={(e: string) => setTaskPost({...taskPost, title: e})}
              caretHidden
            />
          </View>
        </TouchableOpacity>

        <DatePicker
          modal
          open={isOpen === 1}
          date={taskPost.taskStartDate}
          onConfirm={date => {
            setIsOpen(1);
            setTaskPost({...taskPost, taskStartDate: date});
          }}
          onCancel={() => {
            setIsOpen(null);
          }}
        />
        <View style={{marginBottom: wp('4%')}} />
        <RadioBox
          title={'Payment Method'}
          subTitle={'Select Payment Processor'}
          onPress={() => console.log('ww')}
          selected={false}
        />
        <Text style={[styles.helper, styles.custom]}>
          You won't be charged until your work has been done.
        </Text>
        <Text style={styles.helper}>
          Note: Your post will be reviewed by our team and will be made live
          with 24 hours.
        </Text>
      </View>
      <Button
        title={'Post Task'}
        onPress={() => console.log('www')}
        btnStyles={{width: wp('90%'), marginBottom: wp('4%')}}
      />
    </SafeAreaView>
  );
};

export default PostComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontWeight: '500',
    fontSize: hp('1.6%'), // 16
    lineHeight: hp('2.4%'), // 24
    color: COLORS.grey,
  },
  pillsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: wp('1%'),
  },
  mainWrapper: {
    flex: 1,
  },
  helper: {
    fontSize: hp('1.3%'),
    color: COLORS.grey,
    lineHeight: 20,
    paddingTop: wp('4%'),
    width: wp('90%'),
  },
  custom: {textAlign: 'center', paddingTop: wp('1%')},
});
