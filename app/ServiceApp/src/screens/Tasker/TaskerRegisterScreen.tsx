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
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/color';
import Input from '../../components/Input';
import Button from '../../components/Button';
import User from '../../assets/icons/User';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Pills from '../../components/Pills';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Phone from '../../assets/icons/Phone';
import Location from '../../assets/icons/Location';
import {StackNavigation} from '../../helpers/interfaces';
import Close from '../../assets/icons/Close';

type ProfileType = {
  profilePic: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  categories: any[];
  gender: string;
  dob: string;
  address: string;
};

const TaskerRegisterScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const user = useSelector((state: any) => state.user);
  const {categories} = useSelector((state: any) => state.category);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dob, setDob] = useState(new Date());

  const [showModal, setShowModal] = useState(false);

  const [profile, setProfile] = useState<ProfileType>({
    profilePic:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    businessName: user.businessName,
    categories: [],
    gender: user.gender,
    dob: user.email,
    address: `${user.address[0].address1},  ${user.address[0].city}, ${user.address[0].state}, ${user.address[0].country}, ${user.address[0].zipCode}`,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
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
            onChangeText={() => null}
            label={'First Name'}
            placeholder={'Enter First Name'}
            value={`${profile.firstName} ${profile.lastName}`}
            icon={<User fill={COLORS.grey} />}
            caretHidden
            editable={false}
            inputStyles={{color: COLORS.grey}}
          />
          <Input
            label={'Business Name'}
            onChangeText={text => setProfile({...profile, businessName: text})}
            placeholder={'Enter Business Name'}
            value={profile.businessName}
            icon={<User />}
          />

          <View style={{marginTop: wp('4%'), width: wp('90%')}}>
            <Text style={styles.label}>Select Category</Text>
            <View style={styles.pillsWrapper}>
              {categories?.map((item: {_id: string; name: string}) => (
                <Pills
                  title={item.name}
                  onPress={() =>
                    profile.categories?.some(cat => cat._id === item._id)
                      ? setProfile({
                          ...profile,
                          categories: profile.categories.filter(
                            cat => cat._id !== item._id && cat,
                          ),
                        })
                      : setProfile({
                          ...profile,
                          categories: [
                            ...profile.categories,
                            {_id: item._id, name: item.name},
                          ],
                        })
                  }
                  selected={profile.categories?.some(
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
                        profile.categories?.some(cat => cat._id === item._id)
                          ? setProfile({
                              ...profile,
                              categories: profile.categories.filter(
                                cat => cat._id !== item._id && cat,
                              ),
                            })
                          : setProfile({
                              ...profile,
                              categories: [
                                ...profile.categories,
                                {_id: item._id, name: item.name},
                              ],
                            })
                      }
                      selected={profile.categories?.some(
                        cat => cat._id === item._id,
                      )}
                    />
                  ))}
                </View>
                <Button
                  title={'Done'}
                  onPress={() => setShowModal(true)}
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
            onChangeText={() => null}
            label={'Address'}
            placeholder={'Enter Address'}
            value={profile.address}
            icon={<Location fill={COLORS.grey} />}
            caretHidden
            editable={false}
            inputStyles={{color: COLORS.grey}}
          />

          <Input
            label={'Phone Number'}
            onChangeText={text => setProfile({...profile, phone: text})}
            placeholder={'Enter Phone Number'}
            value={profile.phone}
            icon={<Phone fill={COLORS.grey} />}
            caretHidden
            editable={false}
            inputStyles={{color: COLORS.grey}}
          />

          <View style={{marginVertical: wp('4%'), width: wp('90%')}}>
            <Text style={styles.label}>Select Gender</Text>
            <View style={styles.pillsWrapper}>
              {['Male', 'Female', 'Other']?.map(item => (
                <Pills
                  title={item}
                  onPress={() => setProfile({...profile, gender: item})}
                  selected={profile.gender === item}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('red');
              setIsOpen(true);
            }}>
            <View pointerEvents="none">
              <Input
                label="Date of Birth"
                placeholder="DD-MM-YY"
                onChangeText={() => null}
                value={moment(dob).format('YYYY-MM-DD')}
                caretHidden
              />
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={isOpen}
            date={dob}
            onConfirm={date => {
              console.log(date);
              setIsOpen(false);
              setDob(date);
            }}
            onCancel={() => {
              setIsOpen(false);
            }}
          />
        </View>
        <Button
          title={'Save'}
          onPress={() => navigation.navigate('TaskerBottomTab')}
          btnStyles={{
            width: wp('92%'),
            marginBottom: wp('4%'),
            marginTop: wp('10%'),
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskerRegisterScreen;

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
});
