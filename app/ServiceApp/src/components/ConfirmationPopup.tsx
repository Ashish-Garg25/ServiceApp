import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../utils/color';

const ConfirmationPopup = ({
  visible,
  onClose,
  onConfirm,
  message,
  title,
  danger,
  hideBtns,
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.messageText}>{message}</Text>
          {!hideBtns && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  danger ? styles.dangerButton : styles.confirmButton,
                ]}
                onPress={onConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('6%'),
    alignItems: 'center',
    elevation: 5,
    minWidth: wp('80%'),
  },
  title: {
    fontSize: hp('2.4%'),
    marginBottom: wp('2%'),
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
  },
  messageText: {
    fontSize: hp('1.7%'),
    marginBottom: wp('2%'),
    textAlign: 'center',
    color: COLORS.secondary,
    width: wp('80%'),
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp('4%'),
  },
  button: {
    paddingVertical: wp('3%'),
    marginHorizontal: wp('2%'),
    borderRadius: 10,
    paddingHorizontal: wp('10%'),
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  dangerButton: {
    backgroundColor: COLORS.red,
  },
  cancelText: {
    color: COLORS.secondary,
    fontSize: hp('1.8%'),
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('1.8%'),
    textAlign: 'center',
  },
});

export default ConfirmationPopup;
