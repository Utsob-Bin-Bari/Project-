import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TouchableNativeFeedback,Platform} from 'react-native';
import Colors from '../constants/Colors';
import MyButton from '../components/MyButton'; 

const TuitionItem  = props => {
    let TouchableCmp = TouchableOpacity; 

    if(Platform.OS === 'android'&& Platform.Version >=21) { 
        TouchableCmp = TouchableNativeFeedback;
    }

    return ( 
       <View style= {styles.container}>
         <View style={styles.head}>
          <Text style ={styles.title}>Tuition No: {props.tuitionId}</Text>
          <Text style ={styles.id}>Student Address: {props.studentAddress}</Text>
          <Text style ={styles.id}>Studetn Area: {props.studentArea}</Text>
          <Text style ={styles.id}>Student Id: {props.studentId}</Text>
          <Text style ={styles.id}>Subject: {props.subject}</Text>
          <Text style ={styles.id}>Teacher Id: {props.teacherId}</Text>
          <Text style ={styles.id}>Institution: {props.institution}</Text>
          
            <MyButton title="More Info" textColor="white" backgroundColor ={Colors.deepGreen} onPress={()=>{}}/>
         </View>
      </View>
    );

};



const styles = StyleSheet.create({

    container:{
        shadowColor: 'black',
        shadowOpacity: 0.46,
        textShadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:Colors.accent,
        height:380,
        margin:15,
        borderWidth:3,
        borderColor:Colors.primary,
    },
   
    title:{
        fontSize:20,
        fontFamily:'Bold',
        margin:5,
        color:Colors.deepGreen, 
    },
    id:{
        fontSize:14,
        color:'black', 
        fontFamily:'Medium',
        margin:5,
        
    },
    head:{
        alignItems:'center',
    },
});

export default TuitionItem;