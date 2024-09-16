import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from "../modules/authentication/Authentication";
import ForgotPassword from '../modules/authentication/ForgotPassword';
import AddEmployeeBio from "../modules/employee/AddEmployeeBio";
import AddEmployeeSkill from "../modules/employee/AddEmployeeSkill";
import EditEmployee from "../modules/employee/EditEmployee";
import EmployeeList from "../modules/employee/EmployeeList";
import Colors from '../constant/Colors';

const Stack = createNativeStackNavigator();
const MyNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{
      headerStyle:{
        backgroundColor: Colors.primary,
      },
      headerTintColor:'white',
      headerTitleAlign:'center',
      headerTitleStyle:{
        fontFamily: 'Bold',
        fontSize: 25,
      },
      headerBackTitleVisible:false,
      
    }}>
      <Stack.Screen name="Auth" component={Authentication} options={{title:'Log-in to your account'}} />
      <Stack.Screen name="Forgot" component={ForgotPassword} options={{title:'Forgot Password?'}} />
      <Stack.Screen name="List" component={EmployeeList} options={{title:'Home'}} />
      <Stack.Screen name="Bio" component={AddEmployeeBio} options={{title:'Personal Information'}} />
      <Stack.Screen name="Skill" component={AddEmployeeSkill} options={{title:'Add Skill'}} />
      <Stack.Screen name="Edit" component={EditEmployee} options={{title:'Profile'}}/>
    </Stack.Navigator>
  );
};

export default MyNavigator;