import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, Modal } from 'react-native';
import Colors from '../../constant/Colors';
import MyButton from '../../constant/MyButton';
import MySmallButton from '../../constant/MySmallButton';
import { useDispatch } from 'react-redux';
import { updateEmployeeBio } from '../../redux/action';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const AddEmployeeBio = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState();

  const [errorMessage, setErrorMessage] = useState(false);
  const [date, setDate] = useState(new Date(Date.now() - 86400000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validateForm = () => {
    if (!firstName || !gender || !dateOfBirth || !phone) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    if (phone.length !== 11) {
      setErrorMessage('Phone Number must contain 11 digits');
      return false;
    }
    return true;
  };

  const handleBioSubmit = () => {
    if (validateForm()) {
      dispatch(updateEmployeeBio({ firstName, lastName, dateOfBirth, phone, gender }));
      setErrorMessage(false);
      navigation.navigate('Skill');
    }
  };

  const handleMalePress = () => {
    setGender('Male');
    toggleModal();
  };

  const handleFemalePress = () => {
    setGender('Female');
    toggleModal();
  };

  const handleOtherPress = () => {
    setGender('Other');
    toggleModal();
  };

  const showDatePickerModal = () => {
    if (Platform.OS === 'ios') {
      setShowIOSDatePicker(true);
    } else {
      setShowDatePicker(true);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setShowIOSDatePicker(false);
    setDate(currentDate);
    const formattedDate = moment(currentDate).format('DD.MM.YYYY');
    setDateOfBirth(formattedDate);
  };

  const handleIOSDatePickerDone = () => {
    setShowIOSDatePicker(false);
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>First Name</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your First Name"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Last Name (Optional)</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Last Name"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Date of Birth</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={[
                styles.input,
                { color: dateOfBirth ? 'black' : 'grey' },
              ]}
              placeholder="Select Your Date of Birth"
              value={dateOfBirth}
              onFocus={() => {
                Keyboard.dismiss();
                showDatePickerModal();
              }}
              keyboardType="default"
            />
          </View>
        </View>

        {showDatePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date(Date.now() - 86400000)}
          />
        )}

        {Platform.OS === 'ios' && showIOSDatePicker && (
          <Modal transparent={true} animationType="slide" visible={showIOSDatePicker}>
            <View style={styles.modalContainerios}>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="compact"
                  onChange={handleDateChange}
                  maximumDate={new Date(Date.now() - 86400000)} 
                />
                <MySmallButton title="Done" backgroundColor={Colors.lightBlue} textColor="black" onPress={handleIOSDatePickerDone} />
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Gender</Text>
          </View>
          <TouchableOpacity style={styles.inputBox} onPress={toggleModal}>
            <View style={{ paddingTop: 2.5 }}>
              <Text style={[styles.input, { color: gender ? 'black' : 'grey' }]}>
                {gender ? gender : 'Please Select Your Gender'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionLabel}>
            <Text style={styles.text}>Contact Number</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalButtonsWrapper}>
              <TouchableOpacity style={styles.modalButton} onPress={handleMalePress}>
                <Text style={styles.modalButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleFemalePress}>
                <Text style={styles.modalButtonText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleOtherPress}>
                <Text style={styles.modalButtonText}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <MyButton
          title="Next"
          textColor="white"
          backgroundColor={Colors.primary}
          onPress={handleBioSubmit}
        />
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
  sectionLabel: {
    flex: 1,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
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
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Bold',
  },
  modalContainerios: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePickerContainer: {
    backgroundColor: Colors.lightGreen,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    marginTop: 400,
    alignItems: 'center',
  },
  modalButtonsWrapper: {
    borderRadius: 25,
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: Colors.deepGreen,
    paddingVertical: 10,
    paddingHorizontal: 30,
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

export default AddEmployeeBio;

