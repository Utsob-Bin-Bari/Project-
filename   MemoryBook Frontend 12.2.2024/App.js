import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import {enableScreens} from 'react-native-screens';
import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'FontName': require('./fonts/Pacifico-Regular.ttf'),
      });

      setTimeout(() => {
        setLoaded(true);
      }, 3000);
    }

    loadFonts();
  }, []);

  if (!loaded) {
    return (
      <ImageBackground
         source={require('./assets/LoadingScreen.png')}
         style={styles.container}>
      </ImageBackground>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems:'center',
  },
});        