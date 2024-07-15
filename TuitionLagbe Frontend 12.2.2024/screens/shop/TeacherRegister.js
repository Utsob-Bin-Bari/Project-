import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback,ScrollView,
       Keyboard} from 'react-native'; 
import Colors from '../../constants/Colors'; 
import MyButton from '../../components/MyButton';
import {  getTeacher,updateTeacher,addTeacher } from './service/APIService';
import { useSelector } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';


const RegisterScreen = (props) => { 
  const inAppId = useSelector((state) => state.products.inAppId);
  const isTeacher = useSelector((state) => state.products.isTeacher);

  const [id,setId]=useState(0);
  const [name,setName] = useState();
  const [gender,setGender]=useState();
  const [contactNumber, setContactNumber] = useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [address, setAddress] = useState();
  const [area, setArea]=useState();
  const [institution,setInstitution]=useState();
  const [department,setDepartment] = useState();
  const [year, setYear] = useState();
  const [preferance, setPreferance] = useState();
  const [cariculam,setCariculam]=useState();

  const [errorMessage, setErrorMessage] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [showRegistrationButton, setShowRegistrationButton] = useState(true);

  const teacher = {id ,name ,gender,contactNumber,     
    email, password, address, area, institution,
    department, year, preferance, cariculam}

  const validateForm = () => {
    if (!name || !gender || !contactNumber || !email || !address || 
      !area || !institution || !department || !year || !preferance || 
      !cariculam || !id || !password) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    return true;
  };
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  
  const getData = async () => {
    try {
      const res = await getTeacher(id);
       setName(res.data.name)
       setGender(res.data.gender)
       setContactNumber(res.data.contactNumber)
       setEmail(res.data.email)
       setPassword(res.data.password)
       setAddress(res.data.address)
       setArea(res.data.area)
       setInstitution(res.data.institution)
       setDepartment(res.data.department)
       setYear(res.data.year)
       setPreferance(res.data.preferance)
       setCariculam(res.data.cariculam)
    } catch (error) {
      console.log(error);
      setErrorMessage(true);
    }
  };
  
  const updateData = async ()=>{
        await updateTeacher(id,teacher)
            .then(res => {
              console.log(res.data);
            })
            .catch(error => {
              console.log(error);
            });
      };
 
    const addData = async ()=>{
    await addTeacher(teacher)
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
      setId(inAppId);
    }
  }, [inAppId]);
  
  useEffect(() => {
    if (id !== 0) {
      getData();
    }
  }, [id]);

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
                placeholder="Enter Your Student Id"
                value={id === 0 ? "" : id.toString()}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setId(parseInt(numericText, 10)); 
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
                  placeholder="Enter Your Name"
                  value={name}
                  onChangeText={setName}
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
              defaultValue={gender}
              onSelect={(index, value) => setGender(value)}
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
                  value={contactNumber}
                  onChangeText={setContactNumber}
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
                  placeholder="Enter Your Email"
                  value={email}
                  onChangeText={setEmail}
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
                  value={password}
                  onChangeText={setPassword}
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
                  value={address}
                  onChangeText={setAddress}
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
                  defaultValue={area}
                  onSelect={(index, value) => setArea(value)}
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
                <ModalDropdown
                  options={[
                    'Buet',
                    'DMC',
                    'Dhaka University',
                  ]}
                  defaultValue={institution}
                  onSelect={(index, value) => setInstitution(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>


            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Department</Text>
              </View>
              <View style={styles.inputBox}>
                <ModalDropdown
                  options={[
                    'Archi','BME','CE','CSE','ChE','EEE','GCE','IPE','NAME','ME','URP','WRE',
                  ]}
                  defaultValue={department}
                  onSelect={(index, value) => setDepartment(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>HSC Passing Year</Text>
              </View>
              <View style={styles.inputBox}>
                <ModalDropdown
                  options={[
                    '2012','2013','2014','2015','2016','2017','2018','2019','2020','2021',
                    '2022','2023','2024','2025','2026','2027','2028','2029','2030'
                  ]}
                  defaultValue={year}
                  onSelect={(index, value) => setYear(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>



            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Teaching Preference</Text>
              </View>
              <View style={styles.inputBox}>
                <ModalDropdown
                  options={[
                    'Bangla Medium',
                    'English Medium',
                    'English Version',
                    'All',
                  
                  ]}
                  defaultValue={preferance}
                  onSelect={(index, value) => setPreferance(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
                />
              </View>
            </View>


            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Educational Curriculum</Text>
              </View>
              <View style={styles.inputBox}>
                <ModalDropdown
                  options={[
                    'Bangla Medium',
                    'English Medium',
                    'English Version',
                  ]}
                  defaultValue={cariculam}
                  onSelect={(index, value) => setCariculam(value)}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownStyle}
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
                addData();
                setRegistrationSuccessful(true);
                setShowRegistrationButton(false);
                setErrorMessage(false);

                setTimeout(() => {
                  props.navigation.goBack(); 
                }, 5000);
              }
              else
              {
                updateData();
                setShowRegistrationButton(false);
                setErrorMessage(false);

                setTimeout(() => {
                  props.navigation.goBack(); 
                }, 2000);
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



RegisterScreen.navigationOptions = props => {
  return{
  headerTitle: 'Teacher Info',
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
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Bold',
    height: 30, 
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  
});

export default RegisterScreen;