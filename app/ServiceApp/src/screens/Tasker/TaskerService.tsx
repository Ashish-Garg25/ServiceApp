/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/color';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Pills from '../../components/Pills';
import {StackNavigation} from '../../helpers/interfaces';
import Close from '../../assets/icons/Close';
import ImagePicker from 'react-native-image-crop-picker';
import {
  useCreateServiceMutation,
  useGetCategoryMutation,
} from '../../redux/services';
import Toast from 'react-native-toast-message';
import Camera from '../../assets/icons/Camera';
import ScreenHeader from '../../components/ScreenHeader';
import Back from '../../assets/icons/Back';
import Dollar from '../../assets/icons/Dollar';
import BriefCase from '../../assets/icons/BriefCase';

type ServiceType = {
  name: string;
  image: null | string;
  about: string;
  availaility: Date;
  serviceCategory: any[];
  rate: string;
};

const TaskerService = () => {
  const navigation = useNavigation<StackNavigation>();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const [getCategory] = useGetCategoryMutation();
  const [createService] = useCreateServiceMutation();

  const [service, setService] = useState<ServiceType>({
    name: '',
    image: null,
    about: '',
    availaility: new Date(),
    rate: '',
    serviceCategory: [],
  });

  useEffect(() => {
    (async () => {
      const response = await getCategory({}).unwrap();
      setCategories(response.category);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImages = async () => {
    const options: any = {
      includeBase64: true,
      maxWidth: 200,
      maxHeight: 200,
      cropping: true,
      compressImageQuality: 0.4,
    };

    try {
      const result: any = await ImagePicker.openPicker(options);

      let base64Item = `data:${result.mime};base64,${result.data}`;
      setService({...service, image: base64Item});
    } catch (error) {
      // Handle any errors that occur during the image selection
      console.log(error);
    }
  };

  const saveDetails = async () => {
    try {
      console.log('SERVICE ===', service);
      setLoading(true);
      const response = await createService(service).unwrap();
      console.log('response ====', response);
      if (response.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Service created successfully!',
        });
        setLoading(false);
        navigation.navigate('TaskerBottomTab');
      } else {
        throw response;
      }
    } catch (err: any) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message ?? 'Something went wrong',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Add Service'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Input
            onChangeText={(e: string) => setService({...service, name: e})}
            label={'Service Name'}
            placeholder={'Enter Service Name'}
            value={service.name}
            icon={<BriefCase />}
          />
          <Input
            label="About this service"
            placeholder="Write here .."
            value={service.about}
            onChangeText={(e: string) => setService({...service, about: e})}
            bordered
            multiline
            numberOfLines={4}
            inputStyles={{height: hp('15%'), paddingTop: wp('4%')}}
          />

          <View style={{marginTop: wp('4%'), width: wp('90%')}}>
            <Text style={styles.label}>Select Category</Text>
            <View style={styles.pillsWrapper}>
              {categories?.map((item: {_id: string; name: string}) => (
                <Pills
                  title={item.name}
                  onPress={() =>
                    service.serviceCategory?.some(cat => cat._id === item._id)
                      ? setService({
                          ...service,
                          serviceCategory: service.serviceCategory.filter(
                            cat => cat._id !== item._id && cat,
                          ),
                        })
                      : setService({
                          ...service,
                          serviceCategory: [
                            ...service.serviceCategory,
                            {_id: item._id, name: item.name},
                          ],
                        })
                  }
                  selected={service.serviceCategory?.some(
                    cat => cat._id === item._id,
                  )}
                />
              ))}
            </View>

            <Button
              title={'All Categories'}
              onPress={() => setShowModal(true)}
              btnStyles={{
                width: wp('32%'),
                marginTop: wp('4%'),
                padding: wp(0),
                transform: [{scale: 0.9}],
              }}
              outline
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
                    Select Categories
                  </Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Close color={COLORS.black} />
                  </TouchableOpacity>
                </View>
                <View style={styles.pillsWrapper}>
                  {categories?.map((item: {_id: string; name: string}) => (
                    <Pills
                      title={item.name}
                      onPress={() =>
                        service.serviceCategory?.some(
                          cat => cat._id === item._id,
                        )
                          ? setService({
                              ...service,
                              serviceCategory: service.serviceCategory.filter(
                                cat => cat._id !== item._id && cat,
                              ),
                            })
                          : setService({
                              ...service,
                              serviceCategory: [
                                ...service.serviceCategory,
                                {_id: item._id, name: item.name},
                              ],
                            })
                      }
                      selected={service.serviceCategory?.some(
                        cat => cat._id === item._id,
                      )}
                    />
                  ))}
                </View>
                <Button
                  title={'Done'}
                  onPress={() => setShowModal(false)}
                  btnStyles={{
                    width: wp('32%'),
                    marginTop: wp('8%'),
                    padding: wp(0),
                    transform: [{scale: 0.9}],
                    alignSelf: 'flex-start',
                  }}
                />
              </View>
            </Modal>
          </View>

          <Input
            label={'Rate'}
            onChangeText={text => setService({...service, rate: text})}
            placeholder={'$5 ..'}
            value={service.rate}
            icon={<Dollar />}
          />

          <View style={{marginTop: wp('8%')}}>
            <Text style={styles.label}>Upload Image</Text>
            {service?.image !== null ? (
              <View>
                <Image
                  source={{uri: service?.image}}
                  style={styles.borderImage}
                />
                <TouchableOpacity
                  style={styles.close}
                  onPress={() =>
                    setService({
                      ...service,
                      image: null,
                    })
                  }>
                  <Close />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.borderImage}
                onPress={() => uploadImages()}>
                <Camera />
                <Text style={styles.mt1}>Upload Image</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Button
          title={loading ? 'fetching..' : 'Save'}
          onPress={saveDetails}
          btnStyles={{
            width: wp('92%'),
            marginBottom: wp('4%'),
            marginTop: wp('10%'),
          }}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskerService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 9999,
    marginBottom: wp('3%'),
    marginTop: wp('4%'),
  },
  edit: {
    color: COLORS.primary,
    fontSize: hp('1.6%'),
    fontWeight: '500',
  },
  wrapper: {
    flexGrow: 1,
  },
  label: {
    fontWeight: '500',
    fontSize: hp('1.6%'), // 16
    lineHeight: hp('2.4%'), // 24
    color: COLORS.grey,
    marginTop: wp('4%'),
  },
  pillsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: wp('1%'),
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
  mt1: {
    marginTop: wp('2%'),
  },
  close: {
    backgroundColor: COLORS.white,
    borderRadius: 9999,
    padding: wp('1%'),
    position: 'absolute',
  },
});
