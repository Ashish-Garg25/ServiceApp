import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SummaryCard = ({label, totalPayment, bg}: any) => {
  return (
    <View style={[styles.card, {backgroundColor: bg}]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>${totalPayment.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    margin: 10,
    width: '96%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SummaryCard;
