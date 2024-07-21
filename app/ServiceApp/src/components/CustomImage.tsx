import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const CustomImage = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <>
      {user?.profilePic ? (
        <Image
          source={{
            uri: user.profilePic,
          }}
          style={styles.image}
        />
      ) : (
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
          }}
          style={styles.image}
        />
      )}
    </>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  image: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: 9999,
    marginBottom: wp('3%'),
    marginTop: wp('4%'),
  },
  thumbnail: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: 999,
    marginVertical: wp('6%'),
  },
});
