import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View,Modal,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';


const  PasswordResetScreen=props => {
  const [password1,setPassword1]=useState();
  const [password2,setPassword2]=useState();

  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [showRegistrationButton, setShowRegistrationButton] = useState(true);
  const [errorMessage,setErrorMessage]=useState(false);


  

  const handleConfirmPress = () => {
    if (!password1) {
      setErrorMessage('Password cannot be empty!');
    } else if (password1 !== password2) {
      setErrorMessage('Passwords do not match!');
    }
    else {

        setRegistrationSuccessful(true);
        setShowRegistrationButton(false);
        setErrorMessage(false);

        setTimeout(() => {
          props.navigation.navigate("Login"); 
        }, 3000);
      }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tuition Lagbe</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="New Password"
          placeholderTextColor="gray"
          value={password1}
          onChangeText={setPassword1}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {registrationSuccessful && (
            <View style={styles.successContainer}>
              <Text style={styles.successMessage}>Password has been changed!</Text>
            </View>
            )}

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {showRegistrationButton && (
      <MyButton title="Confirm" onPress={handleConfirmPress} backgroundColor='white' textColor={Colors.primary}/>)}
    </View>
  );
}

PasswordResetScreen.navigationOptions = {
  headerTitle: 'Enter New Password',
  headerTitleAlign: 'center',
  headerStyle:{
      backgroundColor:Colors.primary,
  },
  headerTintColor:'white',
  headerBackTitleVisible: false,
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
      successContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
      successMessage: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Bold',
        marginBottom: 10,
      },
  });
  
  export default PasswordResetScreen;