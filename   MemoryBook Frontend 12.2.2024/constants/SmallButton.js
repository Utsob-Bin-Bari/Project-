import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SmallButton = ({ title, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '40%',
    borderRadius:25,
    marginTop: 20,
    marginBottom:20,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default SmallButton;
