import {
  Image,
  SafeAreaView,
  ScrollView,
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
import Pills from '../components/Pills';
import {useSelector} from 'react-redux';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../helpers/interfaces';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Close from '../assets/icons/Close';
import Camera from '../assets/icons/Camera';
import Toast from 'react-native-toast-message';
import Location from '../assets/icons/Location';
import Back from '../assets/icons/Back';
import SearchPlaces from '../components/SearchPlaces';

type TaskPostType = {
  title: string;
  description: string;
  taskType: null | 'Remote' | 'In Person';
  categories: any[];
  taskLocation: string;
};

const CreatePost = () => {
  const [taskPost, setTaskPost] = useState<TaskPostType>({
    title: '',
    description: '',
    taskType: null,
    categories: [],
    taskLocation: '',
  });
  const {categories} = useSelector((state: any) => state.category);

  const [images, setImages] = useState<any>([]);

  // TODO: Google Places API
  const [show, setShow] = useState(false);

  const navigation = useNavigation<StackNavigation>();

  const uploadImages = async () => {
    const options: any = {
      includeBase64: true,
      multiple: true,
      maxWidth: 600,
      maxHeight: 600,
      cropping: true,
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 600,
      compressImageQuality: 0.8,
      maxFiles: 3,
    };

    try {
      const result: any = await ImagePicker.openPicker(options);
      const uploadedImages = [...images]; // Create a copy of the result array

      for (const item of result) {
        const size = item.size / 1000000;

        if (size >= 2) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Image size should not exceed 1MB',
          });
          return;
        } else {
          let base64Item = `data:${item.mime};base64,${item.data}`;
          uploadedImages?.push(base64Item);
        }
      }

      setImages(uploadedImages); // Set the array with all the selected images
    } catch (error) {
      // Handle any errors that occur during the image selection
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Post a Task'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <ScrollView
        style={{marginBottom: wp('4%')}}
        showsVerticalScrollIndicator={false}>
        <Input
          label="Title"
          placeholder="E.g. Install a graphic card in my PC"
          value={taskPost.title}
          onChangeText={(e: string) => setTaskPost({...taskPost, title: e})}
          bordered
        />
        <View style={{marginTop: wp('4%'), width: wp('90%')}}>
          <Text style={styles.label}>Select Task Type</Text>
          <View style={styles.pillsWrapper}>
            <Pills
              title={'In Person'}
              onPress={() => setTaskPost({...taskPost, taskType: 'In Person'})}
              selected={taskPost.taskType === 'In Person'}
            />
            <Pills
              title={'Remote'}
              onPress={() => setTaskPost({...taskPost, taskType: 'Remote'})}
              selected={taskPost.taskType === 'Remote'}
            />
          </View>
        </View>

        <View style={{marginTop: wp('4%'), width: wp('90%')}}>
          <Text style={styles.label}>Select Category</Text>
          <View style={styles.pillsWrapper}>
            {categories?.map((item: {_id: string; name: string}) => (
              <Pills
                title={item.name}
                onPress={() =>
                  taskPost.categories?.some(cat => cat._id === item._id)
                    ? setTaskPost({
                        ...taskPost,
                        categories: taskPost.categories.filter(
                          cat => cat._id !== item._id && cat,
                        ),
                      })
                    : setTaskPost({
                        ...taskPost,
                        categories: [
                          ...taskPost.categories,
                          {_id: item._id, name: item.name},
                        ],
                      })
                }
                selected={taskPost.categories?.some(
                  cat => cat._id === item._id,
                )}
              />
            ))}
          </View>

          {/* <Button
            title={'All Categories'}
            onPress={() => console.log('www')}
            btnStyles={{
              width: wp('40%'),
              marginTop: wp('4%'),
              transform: [{scale: 0.9}],
            }}
            outline
          /> */}
        </View>

        <Input
          label="Description"
          placeholder="Write here .."
          value={taskPost.description}
          onChangeText={(e: string) =>
            setTaskPost({...taskPost, description: e})
          }
          bordered
          multiline
          numberOfLines={4}
          inputStyles={{height: hp('15%'), paddingTop: wp('4%')}}
        />
        <TouchableOpacity onPress={() => setShow(true)}>
          <View pointerEvents="none">
            <Input
              label="Task Location"
              placeholder="Select Task Location"
              value={taskPost.taskLocation}
              onChangeText={() => null}
              icon={<Location />}
              helperText={
                'Please select the task location. Enter the location manually or press the pin icon to fetch your location.'
              }
            />
          </View>
        </TouchableOpacity>
        <SearchPlaces
          isVisible={show}
          handleVisibility={() => setShow(false)}
          navigation={navigation}
          handleLocation={(value: string) =>
            setTaskPost({...taskPost, taskLocation: value})
          }
        />
        <View style={{marginTop: wp('8%')}}>
          <Text style={styles.label}>Upload Images (Max 3)</Text>
          <ScrollView horizontal style={{width: wp('90%')}}>
            {images?.length > 0 &&
              images?.map((item: any) => (
                <View>
                  <Image source={{uri: item}} style={styles.borderImage} />
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() =>
                      setImages(
                        images?.filter(
                          (filItem: ImageOrVideo) =>
                            filItem.path !== item?.path,
                        ),
                      )
                    }>
                    <Close />
                  </TouchableOpacity>
                </View>
              ))}
            {images?.length < 3 && (
              <TouchableOpacity
                style={styles.borderImage}
                onPress={() => uploadImages()}>
                <Camera />
                <Text style={styles.mt1}>Upload Image</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <Button
        title={'Continue'}
        onPress={() =>
          navigation.navigate('PostComplete', {
            taskPost: taskPost,
            images: images,
          })
        }
        btnStyles={{width: wp('90%'), marginBottom: wp('4%')}}
      />
    </SafeAreaView>
  );
};

export default CreatePost;

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
    backgroundColor: COLORS.white,
    borderRadius: 9999,
    padding: wp('1%'),
    position: 'absolute',
  },
});
