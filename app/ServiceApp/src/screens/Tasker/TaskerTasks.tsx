/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from '../../components/ScreenHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/color';
import PostCard from '../../components/PostCard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../helpers/interfaces';
import Button from '../../components/Button';
import Back from '../../assets/icons/Back';
import {
  useGetInvitedTasksMutation,
  useGetTaskByTypeMutation,
} from '../../redux/services';
import Loading from '../../components/Loading';
import ChevronRight from '../../assets/icons/ChevronRight';
import Close from '../../assets/icons/Close';
//import {useGetTaskMutation} from '../../redux/services';

const TaskerTasks = () => {
  const navigation = useNavigation<StackNavigation>();

  const [getTaskByType, {isLoading}] = useGetTaskByTypeMutation();
  const [getInvitedTasks] = useGetInvitedTasksMutation();

  const [tasks, setTasks] = useState([]);
  const [invitedTasks, setInvitedTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTasks();
    currentFilter === 'all' && getInvited();
  }, [currentFilter]);

  const getTasks = async () => {
    try {
      const response = await getTaskByType({type: currentFilter}).unwrap();
      console.log('Response ===', response);
      setTasks(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getInvited = async () => {
    try {
      const response = await getInvitedTasks({}).unwrap();
      setInvitedTasks(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'My Tasks'}
        renderPrefix={<Back size={24} />}
        navigation={navigation}
      />
      {/* My Task Filters Container Starts*/}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingHorizontal: 8,
          marginVertical: hp('2%'),
          width: wp('100%'),
          justifyContent: 'space-evenly',
        }}>
        <Button
          title="All Tasks"
          onPress={() => setCurrentFilter('all')}
          outline={currentFilter === 'all' ? false : true}
          btnStyles={{padding: 12, width: wp('40%'), borderRadius: 30}}
        />
        <Button
          title="Completed"
          onPress={() => setCurrentFilter('completed')}
          outline={currentFilter === 'completed' ? false : true}
          btnStyles={{padding: 12, width: wp('40%'), borderRadius: 30}}
        />
      </View>
      {/* My Task Filters Container Ends*/}

      {invitedTasks?.length > 0 && (
        <TouchableOpacity style={styles.wrapper}>
          <View>
            <Text style={styles.text}>You have new invitation</Text>
            <Text style={styles.smallText}>Click to view them</Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>
      )}

      <FlatList
        data={tasks}
        extraData={currentFilter}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TaskerTaskDetails', {content: item})
            }>
            <PostCard content={item} isProvider={true} />
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('92%'),
              paddingVertical: wp('4%'),
            }}>
            <Text style={{fontSize: hp('2.4%'), color: COLORS.black}}>
              View Invited Tasks
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Close color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={invitedTasks}
            keyExtractor={(item: any) => item._id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TaskerTaskDetails', {content: item})
                }>
                <PostCard content={item} isProvider={true} />
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TaskerTasks;

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
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('6%'),
    backgroundColor: COLORS.lightGreen,
    width: wp('92%'),
    borderRadius: 16,
  },
  text: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: COLORS.black,
    lineHeight: 24,
  },
  smallText: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: COLORS.black,
    lineHeight: 14,
  },
  modalContainer: {
    flex: 1,
    marginTop: wp('90%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
    padding: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
});
