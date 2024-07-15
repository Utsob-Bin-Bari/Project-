import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import LoginScreen from '../screens/shop/LoginScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductDetailBaby from '../screens/shop/ProductDetailBaby';
import ProductDetailMarriage from '../screens/shop/ProductDetailMarriage';
import LocationScreen from '../screens/shop/LocationScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    ProductBaby: ProductDetailBaby,
    ProductMarriage: ProductDetailMarriage,
    Cart:CartScreen,
    Location:LocationScreen,
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



