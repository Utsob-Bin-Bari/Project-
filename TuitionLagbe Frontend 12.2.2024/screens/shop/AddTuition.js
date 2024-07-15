import React, { useState,useEffect } from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback,
        Keyboard,FlatList} from 'react-native';
import Colors from '../../constants/Colors'; 
import MyButton from '../../components/MyButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { addTuition } from './service/TuitionAPI';
import {matchedTeacher } from './service/APIService';
import { resetTeachers, setTeachers } from '../../store/actions/teachers' ;
import TeacherItem from '../../components/TeacherItem';
import {getStudent } from './service/StudentAPIService';
import ModalDropdown from 'react-native-modal-dropdown';

const AddTuitionScreen = (props) => {
  const inAppId = useSelector((state) => state.products.inAppId);
  const isTeacher = useSelector((state) => state.products.isTeacher);

  const [teacherId,setTeacherId]=useState(0);
  const [studentId,setStudentId]=useState(0);
  const [institution, setInstitution]=useState();
  const [subject , setSubject] = useState();
  const [duration, setDuration]=useState();
  const [daysPerWeek, setDaysPerWeek] = useState();
  const [payment,setPayment] = useState();
  const [studentNumber,setStudentNumber]=useState();
  const [description, setDescription]=useState();
  const [studentAddress, setStudentAddress]= useState();
  const [studentArea,setStudentArea]= useState();
  const [tuitionStart, setTuitionStart]=useState();
  const [gender,setGender]= useState();
  const [cariculam,setCariculam]= useState();

  useEffect(() => {
    if (inAppId !== 0) {
      setStudentId(inAppId);
    }
  }, [inAppId]);

  const dispatch=useDispatch();
  const teachers = useSelector((state) => state.products.availableTeachers);
  const [isSearchDisabled,setIsSearchDisabled] =useState(false);


  const tuition = {teacherId,studentId,subject,duration,daysPerWeek,payment,studentNumber,
                   description,studentAddress,studentArea,tuitionStart,institution}
  
  const [errorMessage, setErrorMessage] = useState(false);

  const validateForm = () => {
    if (!subject || !duration || !daysPerWeek || !payment || !description || 
      !studentNumber || !institution) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    return true;
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSearchButton = async () => {
    if (validateForm()) {
      console.log(studentId);
      if (!isTeacher) {
        const studentData = await getStudentData();
        if (studentData) {
          setStudentAddress(prevState => studentData.studentAddress);
          setStudentArea(prevState => studentData.studentArea);
          setGender(prevState => studentData.studentPreferance);
          setCariculam(prevState => studentData.studentCariculam);
        }
      }
  
      // addTuitionData(); // Should be called after pressing the request button with teacher data
      filteredTeacher();
      setErrorMessage(false);
      setIsSearchDisabled(true);
    }
  };
  
  const handleSearchAgainButton=()=>{
     
     setErrorMessage(false);
     setIsSearchDisabled(false); 
     dispatch(resetTeachers());
  };
  
  const getStudentData = async () => {
    try {
      const res = await getStudent(studentId);
      //console.log('Student Data:', res.data);
      return res.data;
    } catch (error) {
      console.log('Error fetching student data:', error);
      return null;
    }
  };
  
  
  const filteredTeacher = async ()=>{
    await matchedTeacher(institution,gender,cariculam)
        .then(res => {
          if(res.status===200){
          dispatch(setTeachers(res.data));
          console.log(res.status);}
        })
        .catch(error => {
          console.log(error);
        });
  };

  const addTuitionData = async ()=>{
    await addTuition(tuition)
        .then(res => {
          //console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
  };

  const handleSelectTeacher = async (selectedTeacherId) => {
    // You can add the logic here to store the selected teacher's ID and add tuition data
    setTeacherId(selectedTeacherId);
    await addTuitionData(); // Assuming you have the addTuitionData function implemented
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{padding:5}}>
      {isSearchDisabled || !isTeacher ? null : (
      <View style={styles.sectionContainer}>
            <View style={styles.sectionLabel}>
              <Text style={styles.text}>Student Area</Text>
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
            </View>)}
            {isSearchDisabled || !isTeacher ? null :(
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Student Adress</Text>
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
            </View>)}

      {isSearchDisabled ? null : (
           <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Teacher's Institution</Text>
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
            </View>)}

      {isSearchDisabled ? null : (
           <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Subject</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Choose the subject"
                  value={subject}
                  onChangeText={setSubject}
                  keyboardType="default"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>)}
      {isSearchDisabled ? null : (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Duration</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter duration of Class"
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>)}
      {isSearchDisabled ? null : (    
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Class per week</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Number of Class"
                  value={daysPerWeek}
                  onChangeText={setDaysPerWeek}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>)}
      {isSearchDisabled ? null : (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Payment per 12 Class</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the value"
                  value={payment}
                  onChangeText={setPayment}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>)}

      {isSearchDisabled ? null : (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Number of Students</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter number of Student"
                  value={studentNumber}
                  onChangeText={setStudentNumber}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>)}
            {isSearchDisabled ? null : (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Description</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Add any request or info"
                  value={description}
                  onChangeText={setDescription}
                  keyboardType="default"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>)}
            {errorMessage && !isSearchDisabled ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <View style={styles.buttonContainer}>
             {isSearchDisabled?(<MyButton
                title= "Search Again"
                textColor="white"
                backgroundColor={Colors.primary}
                onPress={handleSearchAgainButton}
              />):(
             <MyButton
                title= "Search"
                textColor="white"
                backgroundColor={Colors.primary}
                onPress={handleSearchButton}
              />)}
            </View>
            <FlatList
            data={teachers} 
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <TeacherItem
              id={itemData.item.id}
              name={itemData.item.name}
              gender={itemData.item.gender}
              institution={itemData.item.institution}
              department={itemData.item.department}
              cariculam={itemData.item.cariculam}
              address={itemData.item.address}
              area={itemData.item.area}
              year={itemData.item.year}
              onSelect={handleSelectTeacher}
              />)}
            />
      </View>
    </TouchableWithoutFeedback>
  );
};



AddTuitionScreen.navigationOptions = props => {
  return{
  headerTitle:'Search',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize:30,
    fontFamily: 'Bold',
    
  },
  headerRight: () =><HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item title='Home' iconName='home' onPress={() =>{
     props.navigation.navigate({routeName:'ProductsOverview'});
  }}/>
  </HeaderButtons>,
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

export default AddTuitionScreen;


