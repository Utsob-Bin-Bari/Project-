import {React, useEffect, useState} from 'react';
import {View,FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TuitionItem from '../../components/TuitionItem';
import { getTuitionByStudentId, getTuitionByTeacherId } from './service/TuitionAPI';


const TuitionDetailsScreen = (props) => {
  const isTeacher = useSelector((state) => state.products.isTeacher); 
  const inAppId = useSelector((state) => state.products.inAppId);
  const [tuition, setTuition] = useState([]);
  
   const getTuitionById = async ()=>{
    if(isTeacher)
    {
    await getTuitionByTeacherId(inAppId)
        .then(res => {
          if(res.status===200){
          setTuition(res.data);}
        })
        .catch(error => {
          console.log(error);
        });
      }
    else{
      await getTuitionByStudentId(inAppId)
        .then(res => {
          if(res.status===200){
            setTuition(res.data);}
        })
        .catch(error => {
          console.log(error);
        });
      }
   };
   
   useEffect(() => {
    getTuitionById();
  }, []);

  return (
    <View style={{flex:1}}>
    <FlatList
      data={tuition} 
      keyExtractor={(item) => item.tuitionId} 
      renderItem={(itemData) => (
        <TuitionItem
          tuitionId={itemData.item.tuitionId}
          studentAddress={itemData.item.studentAddress}
          studentArea={itemData.item.studentArea}
          studentId={itemData.item.studentId}
          subject={itemData.item.subject}
          teacherId={itemData.item.teacherId}
          institution={itemData.item.institution}
        //Need to add more details in next page
          payment={itemData.item.payment} 
          daysPerWeek={itemData.item.daysPerWeek}
          duration={itemData.item.duration}
          studentNumber={itemData.item.studentNumber}
          description={itemData.item.description}
          tuitionStart={itemData.item.tuitionStart}
        />
      )}
    />
    </View>
  );
  };

TuitionDetailsScreen.navigationOptions = props => {
  return{
  headerTitle: 'Tuition Info',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize:30,
    fontFamily: 'Bold',
    
  },
  headerRight: () =><HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item title='Home' iconName='home' onPress={() =>{
     props.navigation.navigate({routeName:'ProductsOverview'});
  }}/>
  </HeaderButtons>,
  headerBackTitleVisible: false,
};
}

export default TuitionDetailsScreen;


