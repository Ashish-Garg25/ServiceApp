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
import {useSelector} from 'react-redux';
import {useUpdateUserMutation} from '../redux/services';

type ProfileType = {
  profilePic: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const EditProfile = () => {
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.user);

  const [updateUser] = useUpdateUserMutation();

  const [profile, setProfile] = useState<ProfileType>({
    profilePic:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const handleEdit = async () => {
    try {
      const response = await updateUser(profile).unwrap();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={'Edit Profile'}
        renderPrefix={<Back />}
        navigation={navigation}
      />
      <Image
        source={{
          uri: profile.profilePic,
        }}
        style={styles.image}
      />
      <TouchableOpacity>
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
});
