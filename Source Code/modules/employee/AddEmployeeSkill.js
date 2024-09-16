import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal } from 'react-native';
import Colors from '../../constant/Colors';
import MyButton from '../../constant/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeSkill, updateEmployeeId } from '../../redux/action';
import { addEmployee } from '../../api/Api';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AddEmployeeSkill = ({ navigation }) => {
  const employeeData = useSelector((state) => state.employee.employeeData);

  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [level, setLevel] = useState('');

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [showRegistrationButton, setShowRegistrationButton] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validateForm = () => {
    if (!skill || !experience || !level) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    return true;
  };

  const addEmployeeData = async () => {
    try {
      const newEmployeeData = {
        firstName: employeeData.bio.firstName,
        lastName: employeeData.bio.lastName,
        dateOfBirth: employeeData.bio.dateOfBirth,
        phone: employeeData.bio.phone,
        gender: employeeData.bio.gender,
        skill,
        experience,
        level,
      };
      const id = await addEmployee(newEmployeeData);
      if (id) {
        dispatch(updateEmployeeId(id));
        setErrorMessage('');
        setRegistrationSuccessful(true);
        setShowRegistrationButton(false);
        setTimeout(() => {
          navigation.navigate("Edit");
        }, 3000);
      } else {
        setErrorMessage('Server is busy. Please try again!');
      }
    } catch (error) {
      setErrorMessage('Failed to add employee. Please try again!');
    }
  };

  const handleSkillSubmit = () => {
    if (validateForm()) {
      dispatch(updateEmployeeSkill({ skill, experience, level }));
      setErrorMessage('');
      addEmployeeData();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <FontAwesome name="home" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleBeginnerPress = () => {
    setLevel("Beginner");
    toggleModal();
  };
  const handleIntermediatePress = () => {
    setLevel("Intermediate");
    toggleModal();
  };
  const handleAdvancedPress = () => {
    setLevel("Advanced");
    toggleModal();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Skill Name</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter Skill Name"
              value={skill}
              onChangeText={setSkill}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Experience in Years</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Experience"
              value={experience}
              onChangeText={setExperience}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Skill Level</Text>
          </View>
          <TouchableOpacity style={styles.inputBox} onPress={toggleModal}>
            <View style={{ paddingTop: 2.5 }}>
              <Text style={[styles.input, { color: level ? 'black' : 'grey' }]}>
                {level ? level : 'Please Select Your Skill Level'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {registrationSuccessful && (
          <View style={styles.successContainer}>
            <Text style={styles.successMessage}>Employee Successfully Added!</Text>
            <Text style={styles.infoMessage}>Preview Employee Profile.</Text>
          </View>
        )}

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <Modal
          animationType='fade'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalButtonsWrapper}>
              <TouchableOpacity style={styles.modalButton} onPress={handleBeginnerPress}>
                <Text style={styles.modalButtonText}>Beginner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleIntermediatePress}>
                <Text style={styles.modalButtonText}>Intermediate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAdvancedPress}>
                <Text style={styles.modalButtonText}>Advanced</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {showRegistrationButton && (
          <MyButton
            title="Register"
            textColor="white"
            backgroundColor={Colors.primary}
            onPress={handleSkillSubmit}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
  },
  sectionLabel: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    margin: 5,
    fontFamily: 'Bold',
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Bold',
    height: 30,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successMessage: {
    color: 'green',
    fontSize: 18,
    fontFamily: 'Bold',
    marginBottom: 10,
  },
  infoMessage: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Medium',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Bold',
  },
  modalContainer: {
    flex: 1,
    marginTop: 300,
    alignItems: 'center',
  },
  modalButtonsWrapper: {
    borderRadius: 25,
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: Colors.deepGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.46,
    textShadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Bold',
  },
});

export default AddEmployeeSkill;

