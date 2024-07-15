import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity, TouchableNativeFeedback,Platform } from 'react-native';

const ProductItem  = props=> {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android'&& Platform.Version >=21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return ( 
      //Previous code for Url image  
      //source ={{uri:props.image} }
      //<Text style = {styles.price}>${props.price}</Text>
      //<Button color={Colors.primary} title = "View Details" onPress = {props.onViewDetail}/>
     // <Button color={Colors.primary} title = "To Cart" onPress = {props.onAddToCart} />
    
    
    
       <View style= {styles.product}>
       <View styles = {styles.touchable}>
       
        <TouchableCmp onPress = {props.onViewDetail} useForeground >
        <View>
          <View styles = {styles.imageContainer}>
            <Image style={styles.image} source ={props.image} />
          </View>
         <View style = {styles.details}>
          <Text style = {styles.title}>{props.title}</Text>
         </View>
         <View style = {styles.actions}>
            
         </View>
         </View>
         </TouchableCmp>
         </View>
      </View>
    

    );

};



const styles = StyleSheet.create({

    product:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        textShadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20,
        
    },
    touchable:{
        overflow:'hidden',
        borderRadius:10,
    },
    imageContainer:{
        width:'100%',
        height:'60%',
        overflow:'hidden' ,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10, 
        
    },
    image:{
        width:'100%',
        height:'70%',
        
        
    },
   
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginVertical:-36,
        color:'grey',
    },
    price:{
        fontSize:14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'15%',
        paddingHorizontal:20,
    },
    details:{
        alignItems:'center',
        height:'25%',
        padding:10,
    },
    
});

export default ProductItem;