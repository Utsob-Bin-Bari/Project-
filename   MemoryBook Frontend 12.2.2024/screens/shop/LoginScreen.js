import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../constants/Colors';
import MyButton from '../../constants/MyButton';
import SmallButton from '../../constants/SmallButton';


const  LoginScreen=props => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MemoryBook</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
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
        />
      </View>
      <View style={styles.wraper}>
        <SmallButton title='Fogot Password?' backgroundColor={Colors.primary} textColor='white' onPress={()=>{}}/> 
        <Text style={{color:'white',fontSize:40}}>|</Text> 
        <SmallButton title='Sign Up            ' backgroundColor={Colors.primary} textColor='white' onPress={()=>{}}/>
      </View>
      <MyButton title="Login" onPress={() => {
                props.navigation.replace({routeName:'ProductsOverview'});
            }} backgroundColor='white' textColor={Colors.primary}/>
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
      fontFamily: 'FontName',
    },
    logo: {
      fontWeight: 'bold',
      fontSize: 50,
      color:'white',
      marginBottom: 40,
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
  });
  
  export default LoginScreen;
  
