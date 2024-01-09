import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/color';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SendIcon from '../assets/icons/SendIcon';

const MessageInput = ({onChangeText, openPress}: any) => {
  return (
    <View>
      <TextInput
        placeholder={'Send a message'}
        style={styles.input}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={openPress}>
        <SendIcon left={wp('82%')} bottom={wp('8.5%')} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.primaryLight1,
    borderRadius: 999,
    width: wp('92%'),
    padding: wp('4%'),
    paddingLeft: wp('8%'),
  },
});
