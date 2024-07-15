import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import LoginScreen from '../screens/shop/LoginScreen';
import TuitionDetailsScreen from '../screens/shop/TuitionDetailsScreen';
import StudentRegisterScreen from '../screens/shop/StudentRegister';
import ProfileScreen from '../screens/shop/ProfileScreen';
import RegisterScreen from '../screens/shop/TeacherRegister';
import AddTuitionScreen from '../screens/shop/AddTuition';
import ForgotPasswordScreen from '../screens/shop/ForgotPasswordScreen';
import PasswordResetScreen from '../screens/shop/PasswordResetScreen';

import Colors from '../constants/Colors';



const ProductsNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    ProductsOverview: ProductsOverviewScreen,
    TuitionDetails:TuitionDetailsScreen,
    Profile:ProfileScreen,
    Register:RegisterScreen,
    StudentRegister:StudentRegisterScreen,
    add:AddTuitionScreen,
    ForgotPassword:ForgotPasswordScreen,
    PasswordReset:PasswordResetScreen,


  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);



