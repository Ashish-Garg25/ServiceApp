import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from '../components/ScreenHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';
import PostCard from '../components/PostCard';
import Add from '../assets/icons/Add';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import {useGetTaskMutation} from '../redux/services';
import Empty from '../components/Empty';

const Post = () => {
  const navigation = useNavigation<StackNavigation>();
  const [tasks, setTasks] = useState([]);

  const [getTask] = useGetTaskMutation();

  useEffect(() => {
    (async () => {
      const response = await getTask({}).unwrap();
      setTasks(response);
    })();
  }, [getTask, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader renderPrefix={<View />} title={'My Tasks'} />
      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetails', {id: item._id})}>
            <PostCard content={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Empty />}
      />

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('CreatePost')}>
        <Add width={48} height={48} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
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
  mt1: {
    marginTop: wp('2%'),
  },
  borderImage: {
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('35%'),
    height: wp('30%'),
    marginTop: wp('4%'),
    marginRight: wp('2%'),
  },
  imageContainer: {
    width: wp('90%'),
  },
  close: {
    backgroundColor: COLORS.danger,
    borderRadius: 9999,
    padding: wp('2%'),
    position: 'absolute',
    right: 0,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
