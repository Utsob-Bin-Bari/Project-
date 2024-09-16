import React, { useState, useLayoutEffect} from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback,Keyboard,Text,TouchableOpacity,Modal,Button,Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeBio, updateEmployeeSkill } from '../../redux/action';
import { updateEmployee } from '../../api/Api';
import MySmallButton from '../../constant/MySmallButton';
import Colors from '../../constant/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditEmployee = ({ navigation }) => {
  const initialEmployeeData= useSelector(state => state.employee.employeeData);
  const dispatch = useDispatch();

  const [firstName,setFirstName]=useState(initialEmployeeData.bio.firstName);
  const [lastName,setLastName]=useState(initialEmployeeData.bio.lastName);
  const [dateOfBirth,setDateOfBirth]=useState(initialEmployeeData.bio.dateOfBirth);
  const [phone,setPhone]=useState(initialEmployeeData.bio.phone);
  const [gender,setGender]=useState(initialEmployeeData.bio.gender);
  const [skill, setSkill] = useState(initialEmployeeData.skills.skill);
  const [experience, setExperience] = useState(initialEmployeeData.skills.experience);
  const [level, setLevel] = useState(initialEmployeeData.skills.level);

  const [errorMessage, setErrorMessage] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [showRegistrationButton,setShowRegistrationButton]=useState(true);
  const [loading,setLoading]=useState(false);
  const [upload,setUpload]=useState(false);
  const [date, setDate] = useState(new Date(Date.now() - 86400000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [isModal1Visible,setModal1Visible]=useState(false);
  const [isModal2Visible,setModal2Visible]=useState(false);

  const toggleModal1 = () =>{
    setModal1Visible(!isModal1Visible);
  }
  const toggleModal2 = () =>{
    setModal2Visible(!isModal2Visible);
  }

  const validateForm = () => {
    if (!skill || !experience || !level || !firstName || !phone || !dateOfBirth || !gender ) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    return true;
  };

  const handleSave =async() => {
    if(validateForm())
    {
      dispatch(updateEmployeeBio({firstName,lastName,dateOfBirth,phone,gender}));
      dispatch(updateEmployeeSkill({skill,experience,level}));
      setErrorMessage(false);
      setUpload(true);
    }
  };

  const handleUpload = async () => {
      if(upload)
      {
        try {
          setErrorMessage(false);
          setLoading(true);
          const newEmployeeData = {
            id: initialEmployeeData.id,
            firstName,
            lastName,
            dateOfBirth,
            phone,
            gender,
            skill,
            experience,
            level
          };
          const response = await updateEmployee(newEmployeeData.id,newEmployeeData);
          if(response!==null){
            setLoading(false);
            setTimeout(() => {
              navigation.navigate('List');
            }, 3000);
            setRegistrationSuccessful(true);
            setShowRegistrationButton(false);
          }
          else
          {
            setLoading(false);
            setErrorMessage('Server is busy. Please try again!');
          }
        } catch (error) {
          setErrorMessage('Failed to update employee. Please try again!');
        }
      }
      else
      {
        setErrorMessage('Please save the change first!');
      }

    }

    const handleMalePress = () => {
      setGender("Male");
      toggleModal1();
    }
    const handleFemalePress = () => {
      setGender("Female");
      toggleModal1();
    }
    const handleOtherPress = () => {
      setGender("Other");
      toggleModal1();
    }

    const handleBeginnerPress = () => {
      setLevel("Beginner");
      toggleModal2();
    };
    const handleIntermediatePress = () => {
      setLevel("Intermediate");
      toggleModal2();
    };
    const handleAdvancedPress = () => {
      setLevel("Advanced");
      toggleModal2();
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


  const dismissKeyboard=()=>{
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 20, alignItems: 'center', padding: 5 }}>
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
            <TouchableOpacity style={styles.inputBox} onPress={toggleModal1}>
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
            <TouchableOpacity style={styles.inputBox} onPress={toggleModal2}>
              <View style={{ paddingTop: 2.5 }}>
                <Text style={[styles.input, { color: level ? 'black' : 'grey' }]}>
                  {level ? level : 'Please Select Your Skill Level'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          <Modal
            animationType='fade'
            transparent={true}
            visible={isModal2Visible}
            onRequestClose={toggleModal2}
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

          <Modal
            animationType='fade'
            transparent={true}
            visible={isModal1Visible}
            onRequestClose={toggleModal1}
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

          {registrationSuccessful && (
            <View style={styles.successContainer}>
              <Text style={styles.successMessage}>Employee Profile Successfully Updated!</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 0 }}>
          <MySmallButton
            title="Save"
            textColor="white"
            backgroundColor={Colors.primary}
            onPress={handleSave}
          />
          {showRegistrationButton &&
            <MySmallButton
              title={loading ? 'Updating..' : 'Update'}
              textColor="white"
              backgroundColor={(upload) ? Colors.primary : 'grey'}
              onPress={handleUpload}
            />}
        </View>
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
    textAlign:'center',
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
  dropdownText: {
    fontSize: 15,
    fontFamily: 'Bold',
  },
  dropdownStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    marginTop:450,
    alignItems: 'center',
  },
  modalButtonsWrapper: {
    borderRadius: 25,
    flexDirection:'row',
  },
  modalButton: {
    backgroundColor:Colors.deepGreen,
    paddingVertical: 10,
    paddingHorizontal:20,
    borderRadius: 25,
    margin:5,
    borderWidth:1,
    borderColor:'white',
    shadowColor: 'black',
    shadowOpacity: 0.46,
    textShadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,  
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Bold',
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
});

export default EditEmployee;

