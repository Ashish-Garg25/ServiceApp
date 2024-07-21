/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
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
import {useGetTaskMutation} from '../../redux/services';
//import {useGetTaskMutation} from '../../redux/services';

const TaskerTasks = () => {
  const navigation = useNavigation<StackNavigation>();
  const [tasks, setTasks] = useState([]);

  const [filtered, setFiltered] = useState(tasks);
  const [currentFilter, setCurrentFilter] = useState('All');

  const [getTask] = useGetTaskMutation();

  useEffect(() => {
    (async () => {
      const response = await getTask({}).unwrap();
      console.log('response =====', response);
    })();
  }, []);

  const handlePress = (val: any) => {
    setCurrentFilter(val);
    console.log('Clicked', val);
    // const filteredTasks = tasks.filter(item => item.category === val);
    // setFiltered(filteredTasks);
  };

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
          onPress={() => handlePress('All')}
          outline={currentFilter === 'All' ? false : true}
          btnStyles={{padding: 12, width: wp('40%'), borderRadius: 30}}
        />
        <Button
          title="Completed"
          onPress={() => handlePress('Completed')}
          outline={currentFilter === 'Completed' ? false : true}
          btnStyles={{padding: 12, width: wp('40%'), borderRadius: 30}}
        />
      </View>
      {/* My Task Filters Container Ends*/}

      <FlatList
        data={filtered}
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
});
