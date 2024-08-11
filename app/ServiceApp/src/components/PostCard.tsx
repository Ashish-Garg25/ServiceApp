/* eslint-disable react-native/no-inline-styles */
// import {Image, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Location from '../assets/icons/Location';
// import Time from '../assets/icons/Time';
// import Button from './Button';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {COLORS} from '../utils/color';
// import moment from 'moment';
// import {useSelector} from 'react-redux';

// const PostCard = ({content}: any) => {
//   const {createdAt, description, status, taskDate, taskType, title} = content;

//   const user = useSelector((state: any) => state.user);

//   return (
//     <View style={styles.container}>
//       <View>
//         <View style={styles.wrapper}>
//           <Location color={COLORS.primary} />
//           <Text style={styles.text}>{taskType}</Text>
//         </View>
//         <View style={[styles.wrapper, {marginVertical: wp('2%')}]}>
//           <Time color={COLORS.primary} />
//           <Text style={styles.text}>
//             {moment(taskDate).add(1, 'days').calendar()}
//           </Text>
//         </View>
//         <Text style={styles.mainText}>{title}</Text>
//         <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
//           {description}
//         </Text>
//       </View>
//       <View style={styles.flex}>
//         <Image
//           source={{
//             uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//           }}
//           style={styles.image}
//           resizeMode="cover"
//         />
//         <View style={{paddingLeft: wp('2%')}}>
//           <Text
//             style={styles.name}
//             numberOfLines={1}
//             ellipsizeMode="tail">{`${user.firstName} ${user.lastName}`}</Text>
//           <Text style={styles.text}>Posted {moment(createdAt).fromNow()}</Text>
//         </View>
//         <Button
//           title={status}
//           onPress={() => console.log('www')}
//           btnStyles={{
//             width: wp('30%'),
//             transform: [{scale: 0.9}],
//             backgroundColor: COLORS.primaryLight1,
//           }}
//           outline
//         />
//       </View>
//     </View>
//   );
// };

// export default PostCard;

// const styles = StyleSheet.create({
//   image: {
//     width: wp('12%'),
//     height: wp('12%'),
//     borderRadius: 16,
//   },
//   wrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: COLORS.primaryLight1,
//     borderRadius: 12,
//     borderLeftWidth: 4,
//     borderColor: COLORS.primary,
//     padding: wp('4%'),
//     marginHorizontal: wp('2%'),
//     width: wp('92%'),
//     marginTop: wp('4%'),
//   },
//   name: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: hp('1.6%'),
//     paddingLeft: wp('1%'),
//     paddingBottom: wp('1%'),
//     width: wp('35%'),
//   },
//   text: {
//     color: COLORS.secondary,
//     paddingLeft: wp('1%'),
//     fontSize: hp('1.6%'),
//   },
//   mainText: {
//     fontWeight: '600',
//     fontSize: hp('2%'), // 16
//     lineHeight: hp('3%'), // 24
//     color: 'black',
//     textAlign: 'left',
//     paddingVertical: wp('2%'), // 14,
//   },
//   flex: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderColor: COLORS.primaryLight,
//     marginTop: wp('2%'),
//     paddingTop: wp('3%'),
//     width: wp('83%'),
//   },
// });

import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Location from '../assets/icons/Location';
import Time from '../assets/icons/Time';
import Button from './Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import PlaceholderProfilePic from './PlaceholderProfilePic';
import {useSendMessageMutation, useUpdateTaskMutation} from '../redux/services';

const PostCard = ({content, isProvider, invited}: any) => {
  const {_id, createdAt, description, status, taskDate, taskType, title} =
    content;

  const user = useSelector((state: any) => state.user);
  const navigation = useNavigation<StackNavigation>();

  const {currentService} = useSelector((state: any) => state.service);
  const [sendMessage] = useSendMessageMutation();
  const [updateTask] = useUpdateTaskMutation();

  const getBg = () => {
    return status === 'Submitted'
      ? COLORS.lightGrey
      : status === 'In Progress'
      ? COLORS.lightYellow
      : status === 'Complete'
      ? COLORS.lightGreen
      : COLORS.lightRed;
  };

  const getBorderColor = () => {
    return status === 'Submitted'
      ? COLORS.grey
      : status === 'In Progress'
      ? COLORS.yellow
      : status === 'Complete'
      ? COLORS.green
      : COLORS.red;
  };

  const createChat = async () => {
    try {
      const payload = JSON.stringify({
        sender: user._id,
        receiver: content.user,
        task: content._id,
        type: 'Service',
        content: "Hi! I saw your post and I'm interested",
        service: currentService?._id,
      });

      const response = await sendMessage(payload).unwrap();
      console.log(response);
      navigation.navigate('TaskerBottomTab', {screen: 'Messages'});
    } catch (err) {
      console.log(err);
    }
  };

  const declineTask = async () => {
    try {
      const payload = JSON.stringify({
        id: _id,
        status: status,
        hasDeclined: true,
      });

      const response = await updateTask(payload).unwrap();
      console.log('response ===', response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBg(),
          borderColor: getBorderColor(),
        },
      ]}>
      <View>
        {isProvider && invited && (
          <Text
            style={[
              styles.mainText,
              {
                fontSize: hp('2.4%'),
                paddingBottom: wp('4%'),
                color: COLORS.black,
              },
            ]}>
            A new request
          </Text>
        )}
        <View style={styles.wrapper}>
          <Location color={COLORS.primary} />
          <Text style={styles.text}>{taskType}</Text>
        </View>
        <View style={[styles.wrapper, {marginVertical: wp('2%')}]}>
          <Time color={COLORS.primary} />
          <Text style={styles.text}>
            Created on {moment(taskDate).add(1, 'days').calendar()}
          </Text>
        </View>
        <Text style={styles.mainText}>{title}</Text>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
      <View style={styles.flex}>
        {isProvider ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {status === 'Submitted' && (
              <>
                {invited ? (
                  <View style={styles.btnWrapper}>
                    <Button
                      title={'Decline'}
                      onPress={declineTask}
                      outline
                      btnStyles={{
                        width: wp('40%'),
                        transform: [{scale: 0.9}],
                        borderColor: COLORS.danger,
                        backgroundColor: 'transparent',
                      }}
                      textStyles={{color: COLORS.danger}}
                    />
                    <Button
                      title={'Accept'}
                      onPress={createChat}
                      btnStyles={{
                        width: wp('40%'),
                        transform: [{scale: 0.9}],
                        backgroundColor: COLORS.primary,
                      }}
                    />
                  </View>
                ) : (
                  <Button
                    title={'Apply'}
                    onPress={createChat}
                    btnStyles={{
                      width: wp('84%'),
                      transform: [{scale: 0.9}],
                      backgroundColor: isProvider
                        ? COLORS.primary
                        : COLORS.green,
                    }}
                  />
                )}
              </>
            )}
          </View>
        ) : (
          <>
            {user?.profilePic ? (
              <Image
                source={{
                  uri: user?.profilePic,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <PlaceholderProfilePic name={user?.firstName} position={0} />
            )}
            <View style={{paddingLeft: wp('2%')}}>
              <Text
                style={styles.name}
                numberOfLines={1}
                ellipsizeMode="tail">{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.text}>
                Posted {moment(createdAt).fromNow()}
              </Text>
            </View>
            <Button
              title={status}
              onPress={() => console.log('www')}
              btnStyles={{
                width: wp('30%'),
                transform: [{scale: 0.9}],
                backgroundColor: getBorderColor(),
                borderColor: getBorderColor(),
              }}
              textStyles={{color: COLORS.white}}
              outline
            />
          </>
        )}
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  image: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: wp('4%'),
    marginHorizontal: wp('2%'),
    width: wp('92%'),
    marginTop: wp('4%'),
  },
  name: {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('1.6%'),
    paddingLeft: wp('1%'),
    paddingBottom: wp('1%'),
    width: wp('35%'),
  },
  text: {
    color: COLORS.secondary,
    paddingLeft: wp('1%'),
    fontSize: hp('1.6%'),
  },
  mainText: {
    fontWeight: '600',
    fontSize: hp('2%'), // 16
    lineHeight: hp('3%'), // 24
    color: 'black',
    textAlign: 'left',
    paddingVertical: wp('2%'), // 14,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.primaryLight,
    marginTop: wp('2%'),
    paddingTop: wp('3%'),
    width: wp('83%'),
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
