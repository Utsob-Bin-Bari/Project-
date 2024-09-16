import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from './Colors';

const EmployeeCard = ({ employee }) => {
  const { id, employee_name, employee_salary, employee_age, profile_image } = employee;

  const profileImageSource = profile_image
    ? { uri: profile_image }
    : require('../assets/profile.png'); 

  return (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        {id && <Text style={styles.normal}>Id: {id}</Text>}
        {employee_salary && <Text>Salary: ${employee_salary}</Text>}
        {employee_age && <Text>Age: {employee_age}</Text>}

      </View>
      <View style={styles.rightContainer}>
        {employee_name && <Text style={styles.name}>{employee_name}</Text>}
        <Image source={profileImageSource} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: Colors.lightGreen,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  leftContainer: {
    width: '70%',
    justifyContent: 'center',
    fontFamily:'Medium',
  },
  rightContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily:'Bold',
    marginBottom: 5,
  },
  normal:{
    fontSize:14,
    fontFamily:'Medium',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd', 
  },
});

export default EmployeeCard;
