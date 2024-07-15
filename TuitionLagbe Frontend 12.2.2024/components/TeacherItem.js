import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,
         TouchableNativeFeedback,Platform} from 'react-native';
import Colors from '../constants/Colors';
import MyButton from '../components/MyButton'; 

const TeacherItem  = (props) => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android'&& Platform.Version >=21) { 
        TouchableCmp = TouchableNativeFeedback;
    }
    const handleSelectButton = () => {
        props.onSelect(props.id);
      };
    return ( 
       <View style= {styles.container}>
         <View style={styles.head}>
          <Text style ={styles.title}>Teacher Id: {props.id}</Text>
          <Text style ={styles.id}>Name: {props.name}</Text>
          <Text style ={styles.id}>Gender: {props.gender}</Text>
          <Text style ={styles.id}>Institution: {props.institution}</Text>
          <Text style ={styles.id}>Department: {props.department}</Text>
          <Text style ={styles.id}>Cariculam: {props.cariculam}</Text>
          <Text style ={styles.id}>Address: {props.address}</Text>
          <Text style ={styles.id}>Area: {props.area}</Text>
          <Text style ={styles.id}>HSC Passing Year: {props.year}</Text>
          
        <MyButton title="Select" textColor="white" backgroundColor ={Colors.deepGreen}
                  onPress={handleSelectButton}/>
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

export default TeacherItem;