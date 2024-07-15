import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TouchableNativeFeedback,Platform} from 'react-native';
import Colors from '../constants/Colors';
import MyButton from '../components/MyButton'; 

const ProductItem  = props => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android'&& Platform.Version >=21) { 
        TouchableCmp = TouchableNativeFeedback;
    }

    return ( 
    
    
    
       <View style= {styles.container}>
         <View style={styles.head}>
          <Text style ={styles.title}>Tuition Id: {props.tuitionId}</Text>
          <Text style ={styles.id}>Address: {props.studentAddress}</Text>
          <Text style ={styles.id}>Area: {props.studentArea}</Text>
          <Text style = {styles.id}>Class Per Week: {props.daysPerWeek}</Text>
          <Text style = {styles.id}>Class Duration: {props.duration}</Text>
          <Text style = {styles.id}>Payment Per 12 Days: {props.payment} BDT </Text>
          <Text style = {styles.id}>Student Id: {props.studentId}</Text>
          <Text style = {styles.id}>Number of Students: {props.studentNumber}</Text>
          <Text style = {styles.id}>Subject: {props.subject}</Text>
          <Text style = {styles.id}>Note: {props.description}</Text>
            <MyButton title="Accept" textColor="white" backgroundColor ={Colors.deepGreen} onPress={()=>{}}/>
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
        height:410,
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

export default ProductItem;