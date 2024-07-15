import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSavePress = () => {
    // Save selectedLocation to API or local storage
    console.log('Selected location:', selectedLocation);

    // Navigate back to CartScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }} onPress={handleMapPress}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Ionicons name="md-checkmark-circle" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

LocationScreen.navigationOptions = {
  headerTitle: 'Select Delivery Location',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 30,
    fontFamily: 'FontName',
  },
  headerBackTitle: null,
  headerBackTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#00aaff',
    borderRadius: 50,
    padding: 10,
  },
  backButton: {
    backgroundColor: '#666',
    borderRadius: 50,
    padding: 10,
  },
});

export default LocationScreen;