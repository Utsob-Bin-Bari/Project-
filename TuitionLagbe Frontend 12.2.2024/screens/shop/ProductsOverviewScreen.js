import React, {useEffect} from 'react';
import {View,FlatList } from 'react-native';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/ProductItem';
import PlusMinusButton from '../../components/PlusMinus';
import Colors from '../../constants/Colors'; 
import { getTuitionByTeacherId} from './service/TuitionAPI';
import {setTuitions} from '../../store/actions/teachers';
import { useSelector,useDispatch } from 'react-redux';



const ProductsOverviewScreen = (props) => {
  const inAppId = useSelector((state) => state.products.inAppId);
  const isTeacher=useSelector((state)=>state.products.isTeacher);
  const tuitions =useSelector((state)=>state.products.availableTuitions);

  const dispatch = useDispatch();

  const getAllTuitions = async ()=>{
    await getTuitionByTeacherId(0)
        .then(res => {
          if(res.status===200){
          dispatch(setTuitions(res.data));}
        })
        .catch(error => {
          console.log(error);
        });
  };

  useEffect(() => {
    getAllTuitions();
  }, [dispatch]);


  

  return (
    <View style={{flex:1}}>

      <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
    <PlusMinusButton title={isTeacher ? "Add Tuition" : "Find Teacher" }
    onPress={() => {
      props.navigation.navigate({routeName:'add'});
      }} 
       backgroundColor={Colors.deepYellow} textColor='white'/>
    {!isTeacher?null:
    <PlusMinusButton title= "Refresh" 
         onPress={() => {
         getAllTuitions();
      }} 
       backgroundColor={Colors.lightBlue} textColor='white'/>}

       </View>

    {!isTeacher?null:
    <FlatList
      data={tuitions} 
      keyExtractor={(item) => item.tuitionId}
      renderItem={(itemData) => (
        <ProductItem
        tuitionId={itemData.item.tuitionId}
        studentAddress={itemData.item.studentAddress}
        studentArea={itemData.item.studentArea}
        daysPerWeek={itemData.item.daysPerWeek}
        duration={itemData.item.duration}
        payment={itemData.item.payment}
        studentId={itemData.item.studentId}
        studentNumber={itemData.item.studentNumber}
        subject={itemData.item.subject}
        description={itemData.item.description}
        />
      )}
    />}
    
    </View>
  );
  };
ProductsOverviewScreen.navigationOptions = props => {
  return {
    headerTitle: 'Tuition Lagbe',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'Bold',
    },
    headerRight: () => (
      <View>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Tuition Info'
          iconName='information-circle'
          onPress={() => {
            props.navigation.navigate("TuitionDetails");
          }}
        />
      </HeaderButtons>
      </View>
    ),
    headerLeft: () => (
      <View style={{marginLeft:15}}>
      <HeaderButtons HeaderButtonComponent={HeaderButton}> 
        <Item
          title='Profile'
          iconName='person-circle'
          onPress={() => {
            props.navigation.navigate({routeName:'Profile'});
          }}
        />
       
      </HeaderButtons> 
      </View>
    ),
  };
};

export default ProductsOverviewScreen;
