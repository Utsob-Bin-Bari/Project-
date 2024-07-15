import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';

import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';
import { usePreventScreenCapture } from 'expo-screen-capture'; // Import usePreventScreenCapture
//import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/teachers';


//enableScreens();

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  usePreventScreenCapture();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Bold': require('./fonts/arima-madurai-bold.ttf'),
        'Medium': require('./fonts/arima-madurai-medium.ttf'),
      });

      setFontLoaded(true);
    }

    loadFonts();

    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!loaded || !fontLoaded) {
    return (
      <ImageBackground
        source={require('./assets/LoadingScreen.png')}
        style={styles.container}>
        <ActivityIndicator style={styles.id} size="large" color="white" />
      </ImageBackground>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <ShopNavigator />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    marginTop: '60%',
  }
});
