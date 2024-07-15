import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ title, onPress, backgroundColor, textColor }) => {
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
    width: '50%',
    borderRadius:25,
    margin:10,
    shadowColor: 'black',
    shadowOpacity: 0.46,
    textShadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,  
  },
  buttonText: {
    fontFamily: 'Bold',
    fontSize: 20,
  },
});

export default MyButton;
