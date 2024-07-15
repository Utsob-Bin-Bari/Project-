import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback,
   ScrollView,Keyboard} from 'react-native';
import Colors from '../../constants/Colors'; 
import MyButton from '../../components/MyButton';
import {  getStudent,updateStudent,addStudent } from './service/StudentAPIService';
import { useSelector } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';


const StudentRegisterScreen = (props) => {
  const inAppId = useSelector((state) => state.products.inAppId);
  const isTeacher = useSelector((state) => state.products.isTeacher);

  const [studentId, setStudentId] = useState(0);
  const [studentName,setStudentName] = useState();
  const [studentGender,setStudentGender]=useState();
  const [studentContactNumber, setStudentContactNumber] = useState();
  const [studentEmail,setStudentEmail]=useState();
  const [studentPassword, setStudentPassword]=useState();
  const [studentAddress, setStudentAddress] = useState();
  const [studentArea,setStudentArea]=useState();
  const [studentInstitution,setStudentInstitution]=useState();
  const [studentGroup,setStudentGroup] = useState();
  const [studentYear, setStudentYear] = useState();
  const [studentPreferance, setStudentPreferance] = useState();
  const [studentCariculam,setStudentCariculam]=useState();
  const [nid,setNid]=useState(0);
  
  const [errorMessage, setErrorMessage] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [showRegistrationButton, setShowRegistrationButton] = useState(true);

  const student = {studentId ,studentName ,studentGender,studentContactNumber,     
    studentEmail, studentPassword, studentAddress, studentArea, studentInstitution,
    studentGroup, studentYear, studentPreferance, studentCariculam,nid}

  const validateForm = () => {
    if ( ! studentId || !studentName ||!studentGender || !studentAddress || !studentContactNumber || !studentInstitution || !studentYear 
      || !studentPreferance || !studentGroup || !studentCariculam || !studentArea || !studentGender 
      || !studentEmail || !nid) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    return true;
  };
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  const getStudentData = async () => {
      try {
        const res = await getStudent(studentId);
         setStudentName(res.data.studentName)
         setStudentGender(res.data.studentGender)
         setStudentContactNumber(res.data.studentContactNumber)
         setStudentEmail(res.data.studentEmail)
         setStudentPassword(res.data.studentPassword)
         setStudentAddress(res.data.studentAddress)
         setStudentArea(res.data.studentArea)
         setStudentInstitution(res.data.studentInstitution)
         setStudentGroup(res.data.studentGroup)
         setStudentYear(res.data.studentYear)
         setStudentPreferance(res.data.studentPreferance)
         setStudentCariculam(res.data.studentCariculam)
         setNid(res.data.nid)
      } catch (error) {
        console.log(error);
        setErrorMessage(true);
      }
    };
    
  const updateStudentData = async ()=> {
          await updateStudent(studentId,student)
              .then(res => {
                console.log(res.data);
              })
              .catch(error => {
                console.log(error);
              });
        };
   
  const addStudentData = async ()=>{
      await addStudent(student)
          .then(res => {
            console.log(res.data);
            console.log(res.status);
          })
          .catch(error => {
            console.log(error);
          });
    };

  useEffect(() => {
      if (inAppId !== 0) {
        setStudentId(inAppId);
      }
    }, [inAppId]);
    
  useEffect(() => {
      if (studentId !== 0) {
        getStudentData();
      }
    }, [studentId]);
  
  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={styles.container} horizontal={false}>
            <View style={styles.sectionContainer}>
            <View style={styles.sectionLabel}>
                <Text style={styles.text}>Student Id</Text>
              </View>
              <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Auto Generated for this platform"
                value={studentId === 0 ? "" : studentId.toString()}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setStudentId(parseInt(numericText, 10));
                }}
                keyboardType="numeric"
                onResponderRelease={() => Keyboard.dismiss()}
                editable={inAppId===0}
              />
              </View>
             </View>
              
              
              
              <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Name</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Student Name"
                  value={studentName}
                  onChangeText={setStudentName}
                  keyboardType="default"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
          </View>


            
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Gender</Text>
              </View>
              <View style={styles.inputBox}>
                <ModalDropdown
                options={['Male', 'Female']}
                defaultValue={studentGender}
                onSelect={(index, value) => setStudentGender(value)}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
              />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Contact Number</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 017********"
                  value={studentContactNumber}
                  onChangeText={setStudentContactNumber}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Email</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Student Email"
                  value={studentEmail}
                  onChangeText={setStudentEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Password</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Password"
                  value={studentPassword}
                  onChangeText={setStudentPassword}
                  keyboardType="default"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>


            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Adress</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter House and Road no"
                  value={studentAddress}
                  onChangeText={setStudentAddress}
                  keyboardType="default"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Area</Text>
              </View>
              <View style={styles.inputBox}>
              <ModalDropdown
                  options={[
                    'Adabor','Badda','Cantonment','Dhanmondi','ECB','Farmgate','Gulshan','Hatirpool',
                    'Hatirjheel','Khilkhet','Lalbagh','Lalmatia','Mirpur','Mogbazar','Mohakhali',
                    'Mohammadpur','Motijheel','Mugdha','Panthapath','Polashi','Polton','Uttra'
                  ]}
                  defaultValue={studentArea}
                  onSelect={(index, value) => setStudentArea(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Institution</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Student Institution"
                  value={studentInstitution}
                  onChangeText={setStudentInstitution}
                  keyboardType="default"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>


            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Group</Text>
              </View>
              <View style={styles.inputBox}>
              <ModalDropdown
                  options={[
                    'Science','Arts','Commerce',
                  ]}
                  defaultValue={studentGroup}
                  onSelect={(index, value) => setStudentGroup(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>SSC Exam Year</Text>
              </View>
              <View style={styles.inputBox}>
              <ModalDropdown
                  options={[
                    '2018','2019','2020','2021','2022','2023','2024','2025','2026',
                    '2027','2028','2029','2030'
                  ]}
                  defaultValue={studentYear}
                  onSelect={(index, value) => setStudentYear(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Teacher Preference</Text>
              </View>
              <View style={styles.inputBox}>
              <ModalDropdown
                  options={[
                    'Male','Female','No',
                  ]}
                  defaultValue={studentPreferance}
                  onSelect={(index, value) => setStudentPreferance(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Educational Curriculam</Text>
              </View>
              <View style={styles.inputBox}>
              <ModalDropdown
                  options={[
                    'Bangla Medium','English Medium','English Version',
                  ]}
                  defaultValue={studentCariculam}
                  onSelect={(index, value) => setStudentCariculam(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>


            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Gurdian NID Number</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Gurdian NID"
                  value={nid === 0 ? "" : nid.toString()} // Convert the numeric id to a string here
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    setNid(parseInt(numericText, 10)); // Convert it back to a number when updating the state
                  }}
                  keyboardType="numeric"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>


            {registrationSuccessful && (
            <View style={styles.successContainer}>
              <Text style={styles.successMessage}>Registration Successful!</Text>
              <Text style={styles.infoMessage}>We will evaluate all information within 2 hours and contact you through email.</Text>
            </View>
            )}

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            {showRegistrationButton && (
          <MyButton
          title = {(inAppId===0)?"Register":"Update"}
          textColor="white"
          backgroundColor={Colors.primary}
          onPress={() => {
            if (validateForm()) {
              if(inAppId===0)
              {
              console.log(student)
              addStudentData();
              setRegistrationSuccessful(true);
              setShowRegistrationButton(false);
              setErrorMessage(false);

              setTimeout(() => {
                props.navigation.goBack(); 
              }, 5000);
            }
            else
            {
              updateStudentData();
              setRegistrationSuccessful(true);
              setShowRegistrationButton(false);
              setErrorMessage(false);

              setTimeout(() => {
                props.navigation.goBack(); 
              }, 5000);
            }
          }
          }}
        />
        )}


            
      </ScrollView>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};



StudentRegisterScreen.navigationOptions = props => {
  return{
  headerTitle: 'Student Info',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize:30,
    fontFamily: 'Bold',
    
  },
  headerBackTitleVisible: false,
};
}

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
    marginBottom:4,
    width: '100%',
  },
  text: {
    fontSize: 15,
    margin:5,
    fontFamily: 'Bold',
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    height:30,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 5,
    fontFamily: 'Bold',
   
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Bold',
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
  dropdownText: {
    fontSize: 15,
    fontFamily: 'Bold',
  },
  dropdownStyle: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    fontSize:15,
  },
  
});

export default StudentRegisterScreen;