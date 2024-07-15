import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View,Modal,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import TransparentButton from '../../components/TransparentButton';
import { getTeacher } from './service/APIService';
import { getStudent } from './service/StudentAPIService';
import { setInAppId, setTeacher } from '../../store/actions/teachers';
import { useDispatch } from 'react-redux';


const  LoginScreen=props => {
  const [isModalVisible,setModalVisible] =useState(false);
  const [loginId,setLoginId]=useState(0);
  const [loginPassword,setLoginPassword]=useState();
  const [errorMessage,setErrorMessage]=useState(false);

  const dispatch=useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleStudentPress = () => {
    props.navigation.navigate("StudentRegister");
    toggleModal();
  }
  const handleTeacherPress = () => {
    props.navigation.navigate("Register");
    toggleModal();
  }
  const getData = async () => {
    try {
      if(loginId>1000000)
      {
      const res = await getTeacher(loginId);
      if (res.data.password === loginPassword) {
        dispatch(setInAppId(loginId));
        dispatch(setTeacher(true));
        props.navigation.replace({ routeName: 'ProductsOverview' });
      } else {
        setErrorMessage(true);
      }}
      else{
        const res = await getStudent(loginId);
      if (res.data.studentPassword === loginPassword) {
        dispatch(setInAppId(loginId));
        dispatch(setTeacher(false));
        props.navigation.replace({ routeName: 'ProductsOverview' });
      } else {
        setErrorMessage(true);
      }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(true);
    }
  };

  const handleLoginPress = () => {
    getData();
}

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tuition Lagbe</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Student Id"
          placeholderTextColor="gray"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          value={loginId === 0 ? "" : loginId.toString()} // Convert the numeric id to a string here
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setLoginId(parseInt(numericText, 10)); // Convert it back to a number when updating the state
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={loginPassword}
          onChangeText={setLoginPassword}
        />
      </View>
      <View style={styles.wraper}>
        <TransparentButton title='Fogot Password?' backgroundColor={Colors.primary} textColor='white'
         onPress={()=>{props.navigation.navigate({routeName:'ForgotPassword'})}}/> 
        <Text style={{color:'white',fontSize:40}}>|</Text> 
        <TransparentButton title='Sign Up            ' backgroundColor={Colors.primary} textColor='white' 
        onPress={toggleModal}/>
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>Incorrect Id or Password!</Text> : null}
      <MyButton title="Login" onPress={handleLoginPress} backgroundColor='white' textColor={Colors.primary}/>
    
    <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalButtonsWrapper}>
          <TouchableOpacity style={styles.modalButton} onPress={handleStudentPress}>
            <Text style={styles.modalButtonText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleTeacherPress}>
            <Text style={styles.modalButtonText}>Teacher</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
}

  
  LoginScreen.navigationOptions = {
    headerTitle: 'Log-in to your account',
    headerStyle:{
        backgroundColor:Colors.primary,
    },
    headerTintColor:'white',
    headerShown: false,
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      fontSize: 50,
      color:'white',
      marginBottom: 40,
      fontFamily: 'Bold',
    },
    inputView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
      shadowColor: 'black',
      shadowOpacity: 0.46,
      textShadowOffset:{width:0,height:2},
      shadowRadius:8,
      elevation:5, 
    },
    inputText: {
      height: 50,
      color:'black',
    },
    wraper:{
      flexDirection:'row',
      padding:10,
      alignItems:'center',

    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    modalButtonsWrapper: {
      borderRadius: 25,
      marginBottom: '62%',
      marginHorizontal: 20, 
    },
    modalButton: {
      backgroundColor:Colors.deepGreen,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      marginBottom: 10,
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
    errorMessage: {
      color: 'red',
      marginTop: 10,
      textAlign: 'center',
      fontSize: 14,
      fontFamily: 'Bold',
    },
  });
  
  export default LoginScreen;
  
