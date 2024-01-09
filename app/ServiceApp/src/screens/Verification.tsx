import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Close from '../assets/icons/Close';
import Camera from '../assets/icons/Camera';
import ImageCropPicker from 'react-native-image-crop-picker';
import {COLORS} from '../utils/color';
import ScreenHeader from '../components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import Back from '../assets/icons/Back';

const Verification = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState<any>(null);

  const uploadImages = async () => {
    const options: any = {
      includeBase64: false,
      maxWidth: 300,
      maxHeight: 300,
      cropping: true,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.6,
      maxFiles: 1,
    };

    try {
      const result: any = await ImageCropPicker.openPicker(options);

      console.log('res', result);

      setImage(result);
    } catch (error) {
      // Handle any errors that occur during the image selection
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Verification"
        navigation={navigation}
        renderPrefix={<Back />}
      />
      <View style={{marginTop: wp('8%')}}>
        <Text style={styles.label}>Upload Photo ID</Text>
        <View>
          {image && (
            <>
              <Image source={{uri: image.path}} style={styles.image} />
              <TouchableOpacity
                style={styles.close}
                onPress={() => setImage(null)}>
                <Close />
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity
          style={styles.borderImage}
          onPress={() => uploadImages()}>
          <Camera />
          <Text style={styles.mt1}>Upload Photo ID</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

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
    marginBottom: wp('4%'),
  },
  mt1: {
    marginTop: wp('2%'),
  },
  image: {
    width: wp('92%'),
    height: wp('50%'),
    borderRadius: 10,
  },
  borderImage: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderStyle: 'dashed',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('92%'),
    height: wp('30%'),
    marginTop: wp('4%'),
    marginRight: wp('2%'),
  },
  close: {
    backgroundColor: COLORS.white,
    borderRadius: 9999,
    padding: wp('1%'),
    position: 'absolute',
    right: 0,
    top: -4,
  },
});
