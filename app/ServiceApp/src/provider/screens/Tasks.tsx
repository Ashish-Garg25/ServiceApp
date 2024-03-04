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
  import Add from '../../assets/icons/Add';
  import {useNavigation} from '@react-navigation/native';
  import {StackNavigation} from '../../helpers/interfaces';
  import Button from '../../components/Button';
import Back from '../../assets/icons/Back';
  //import {useGetTaskMutation} from '../../redux/services';
  
  const Tasks = () => {
    const navigation = useNavigation<StackNavigation>();
    const [tasks, setTasks] = useState([
        {
            createdAt: '20240304', 
            description: 'This is the first task you have been choosen for. Do the task with full devotion.', 
            status: 'In Progress', 
            taskDate: '20240304', 
            taskType: 'Remote', 
            title: 'Cupboard Repair Request',
            _id: '000012132',
            category: 'Ongoing',
            clientName: 'Johnny',
            //clientLocation: 'Winnipeg, Manitoba',
            remainingTime: '1 hour',
        },
        {
            createdAt: '20240304', 
            description: 'This is the first task you have been choosen for. Do the task with full devotion.', 
            status: 'In Progress', 
            taskDate: '20240304', 
            taskType: 'Winnipeg, Manitoba', 
            title: 'Cupboard Repair Request',
            _id: '000012133',
            category: 'Completed',
            clientName: 'Johnny',
            //clientLocation: 'Winnipeg, Manitoba',
            remainingTime: '25 minutes',
        },
        {
            createdAt: '20240304', 
            description: 'This is the first task you have been choosen for. Do the task with full devotion.', 
            status: 'In Progress', 
            taskDate: '20240304', 
            taskType: 'Toronto', 
            title: 'Cupboard Repair Request',
            _id: '000012134',
            category: 'Completed',
            clientName: 'Johnny',
            //clientLocation: 'Winnipeg, Manitoba',
            remainingTime: '39 minutes',
        },
        {
            createdAt: '20240304', 
            description: 'This is the first task you have been choosen for. Do the task with full devotion.', 
            status: 'In Progress', 
            taskDate: '20240304', 
            taskType: 'Yarmouth, NS, Canada', 
            title: 'Cupboard Repair Request',
            _id: '000012135',
            category: 'Ongoing',
            clientName: 'Johnny',
            //clientLocation: 'Winnipeg, Manitoba',
            remainingTime: '50 minutes',
        },
        {
            createdAt: '20240304', 
            description: 'This is the first task you have been choosen for. Do the task with full devotion.', 
            status: 'In Progress', 
            taskDate: '20240304', 
            taskType: 'Yarmouth, NS, Canada', 
            title: 'Cupboard Repair Request',
            _id: '000012136',
            category: 'Completed',
            hireStatus: 'hired',
            clientName: 'Johnny',
            //clientLocation: 'Winnipeg, Manitoba',
            remainingTime: '50 minutes',
        },
    ]);
    const [filtered, setFiltered] = useState([{}]);
    const [currentFilter, setCurrentFilter] = useState('Ongoing');
  
    //const [getTask] = useGetTaskMutation();
  
    useEffect(() => {
    //   (async () => {
    //     const response = await getTask({}).unwrap();
    //     setTasks(response);
    //   })();
    }, 
        //[getTask]
    );
    
    const handlePress =(val: any)=> {
        setCurrentFilter(val);
        console.log("Clicked", val)
        const filteredTasks = tasks.filter(item=> item.category!==val);
        setFiltered(filteredTasks);
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'My Tasks'} renderPrefix={<Back size={24}/>} navigation={navigation}/>
        {/* My Task Filters Container Starts*/}
        <View 
            style={{
                flexDirection: 'row', 
                alignSelf: 'flex-start', 
                paddingHorizontal: 8,
                marginTop: hp('4%'), 
                width: wp('100%'), 
                justifyContent: 'space-evenly'
            }}
        >
            <Button title="Ongoing" onPress={()=> handlePress('Ongoing')} outline={currentFilter==='Ongoing' ? false : true} btnStyles={{padding: 12, width: wp('40%'), borderRadius: 30}}/>
            <Button title="Completed" onPress={()=> handlePress('Completed')} outline={currentFilter==='Completed' ? false : true} btnStyles={{padding: 12, width: wp('40%'), borderRadius: 30}}/>
        </View>
        {/* My Task Filters Container Ends*/}

        <FlatList
          data={tasks}
          extraData={filtered}
          keyExtractor={(item: any) => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostDetails', {id: item._id})}>
              <PostCard content={item} isProvider={true}/>
            </TouchableOpacity>
          )}
        />
  
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => navigation.navigate('CreatePost')}>
          <Add width={48} height={48} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  export default Tasks;
  
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