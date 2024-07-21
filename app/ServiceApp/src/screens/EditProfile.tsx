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
import {COLORS} from '../utils/color';
import Input from '../components/Input';
import Button from '../components/Button';
import User from '../assets/icons/User';
import Mail from '../assets/icons/Mail';
import Phone from '../assets/icons/Phone';
import ScreenHeader from '../components/ScreenHeader';
import Back from '../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateUserMutation} from '../redux/services';
import ImagePicker from 'react-native-image-crop-picker';
import PlaceholderProfilePic from '../components/PlaceholderProfilePic';
import Toast from 'react-native-toast-message';
import {setUserDetails} from '../redux/slices/user';

type ProfileType = {
  profilePic: null | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const EditProfile = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const [updateUser] = useUpdateUserMutation();

  const [profile, setProfile] = useState<ProfileType>({
    profilePic: null,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const handleEdit = async () => {
    try {
      const response = await updateUser(profile).unwrap();
      if (response.variant === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile Updated successfully',
        });

        dispatch(setUserDetails(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      setProfile({...profile, profilePic: base64Item});
    } catch (error) {
      // Handle any errors that occur during the image selection
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Edit Profile'}
        renderPrefix={<Back />}
        navigation={navigation}
      />

      {profile.profilePic ? (
        <Image
          source={{
            uri: profile.profilePic,
          }}
          style={styles.image}
        />
      ) : (
        <View style={styles.thumbnail}>
          <PlaceholderProfilePic
            name={user.firstName}
            position={0}
            size={'20%'}
          />
        </View>
      )}

      <TouchableOpacity onPress={uploadImages}>
        <Text style={styles.edit}>Edit Profile Pic</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Input
          label={'First Name'}
          onChangeText={text => setProfile({...profile, firstName: text})}
          placeholder={'Enter First Name'}
          value={profile.firstName}
          icon={<User fill={COLORS.grey} />}
          caretHidden
          editable={false}
          inputStyles={{color: COLORS.grey}}
        />
        <Input
          label={'Last Name'}
          onChangeText={text => setProfile({...profile, lastName: text})}
          placeholder={'Enter Last Name'}
          value={profile.lastName}
          icon={<User fill={COLORS.grey} />}
          caretHidden
          editable={false}
          inputStyles={{color: COLORS.grey}}
        />
        <Input
          label={'Email'}
          onChangeText={text => setProfile({...profile, email: text})}
          placeholder={'Enter Email'}
          value={profile.email}
          icon={<Mail fill={COLORS.grey} />}
          caretHidden
          editable={false}
          inputStyles={{color: COLORS.grey}}
        />
        <Input
          label={'Phone Number'}
          onChangeText={text => setProfile({...profile, phone: text})}
          placeholder={'Enter Phone Number'}
          value={profile.phone}
          icon={<Phone />}
        />
      </View>
      <Button
        title={'Save'}
        onPress={handleEdit}
        btnStyles={{width: wp('92%'), marginBottom: wp('4%')}}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

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
  thumbnail: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 999,
    marginVertical: wp('6%'),
  },
});
