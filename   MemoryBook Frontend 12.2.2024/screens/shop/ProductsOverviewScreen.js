import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const priceToScreenMap = {
    1: 'ProductDetail',
    2: 'ProductBaby',
    default: 'ProductMarriage',
  };

  const navigateToScreen = (price) => {
    const screenName = priceToScreenMap[price] || priceToScreenMap.default;
    props.navigation.navigate(screenName);
  };

  return (
    <ScrollView>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          image={item.imageUrl}
          title={item.title}
          onViewDetail={() => navigateToScreen(item.price)}
        />
      ))}
    </ScrollView>
  );
};

ProductsOverviewScreen.navigationOptions = props => {
  return {
    headerTitle: 'MemoryBook',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'FontName',
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Profile'
          iconName='cart'
          onPress={() => {
            props.navigation.navigate({routeName:'Cart'});
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='menu'
          onPress={() => {
            console.log('Left Button is working!');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
