import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Colors from '../../constant/Colors';
import MyButton from '../../constant/MyButton';
import TransparentButton from '../../constant/TransparentButton';


const  Authentication= props => {
  const [userName,setUserName]=useState();
  const [loginPassword,setLoginPassword]=useState();
  const [errorMessage,setErrorMessage]=useState(false);

  const validateForm = () => {
    if (!userName || !loginPassword) {
      setErrorMessage('Please fill in all fields!');
      return false;
    }
    return true;
  };

  //Login allows everyone because no api given for authentication 
  const handleLoginPress = () => {
    if (validateForm()) {
      //Call API to check authentication and set new Error Message for incorrect username and password
      //setErrorMessage('Incorrect Username or Password!');
      setErrorMessage(false);
      props.navigation.navigate("List");
    }
  }
  const handleForgotPassword=()=>{
    props.navigation.navigate("Forgot");
  }
  //Dismiss keyboard by touching anywhere except keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <Text style={styles.logo}>Green Delta Insurance</Text>
      <Text style={styles.panel}> Admin Panel</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="gray"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={userName}
          onChangeText={setUserName}
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
        <TransparentButton title='Fogot Password?' backgroundColor={Colors.primary} 
        textColor='white' onPress={handleForgotPassword}/> 
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <MyButton title="Login" backgroundColor='white' textColor={Colors.primary} onPress={handleLoginPress}/>
    </View>
    </TouchableWithoutFeedback>
  );
}

  

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      fontSize:30,
      color:'white',
      marginTop:20,
      fontFamily: 'Bold',
    },
    panel: {
      fontSize:25,
      color:'white',
      marginBottom:30,
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

export default Authentication;







  