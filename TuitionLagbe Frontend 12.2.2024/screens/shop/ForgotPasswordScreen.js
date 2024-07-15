import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View,Modal,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';


const  ForgotPasswordScreen=props => {

  const [showRegistrationButton, setShowRegistrationButton] = useState(true);
  const [timer,setTimer]=useState(10);

  useEffect(() => {
    let interval;

    if (!showRegistrationButton && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowRegistrationButton(true);
    }

    return () => clearInterval(interval);
  }, [showRegistrationButton, timer]);

  const handleOTP = () => {
    setShowRegistrationButton(false);
    setTimer(10);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tuition Lagbe</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email or Phone Number"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="OTP Code"
          placeholderTextColor="gray"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {showRegistrationButton ? (
        <MyButton
          title="Sent OTP"
          onPress={handleOTP}
          backgroundColor="white"
          textColor={Colors.primary}
        />
      ) : (
        <Text style={{ color: 'white', marginBottom: 10 }}>
          Resend OTP in {timer} seconds
        </Text>
      )}
        
        
      <MyButton title="Confirm" onPress={() => {
                props.navigation.replace({routeName:'PasswordReset'});
            }} backgroundColor='white' textColor={Colors.primary}/>
    </View>
  );
}

ForgotPasswordScreen.navigationOptions = {
    headerTitle: 'Forgot Password?',
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
  });
  
  export default ForgotPasswordScreen;