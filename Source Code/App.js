import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import MyNavigator from './navigator/MyNavigator';
import { Provider } from 'react-redux';
import {Store} from './redux/Store'
enableScreens();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Bold': require('./assets/fonts/arima-madurai-bold.ttf'),
        'Medium': require('./assets/fonts/arima-madurai-medium.ttf'),
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
      <View style={{flex:1}}>
      <Provider store={Store}>
        <NavigationContainer>
          <MyNavigator/>
        </NavigationContainer>
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
    marginTop: '30%',
  }
});
