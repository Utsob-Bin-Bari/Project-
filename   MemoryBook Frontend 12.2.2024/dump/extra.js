import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import MyButton from '../../constants/MyButton';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

    const ProductDetailBaby = props => {
      const [selectedPhotos, setSelectedPhotos] = useState([]);
    
      const pickPhotosHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          allowsMultipleSelection:true,
          aspect: [4, 3],
          quality: 1
        });

    if (!result.canceled) {
      // add your logic here to modify or process the selected photos
      setSelectedPhotos([...selectedPhotos, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const renderSelectedPhotos = () => {
    return selectedPhotos.map((photo, index) => (
      <View style={styles.imageContainer} key={index}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
    ));
  };


  return (
    <View style={styles.container}>
      <MyButton title="Pick Photos" textColor='white'
        backgroundColor={Colors.primary} onPress={pickPhotosHandler} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderSelectedPhotos()}
      </ScrollView>
      <Text style={styles.text}>
        Uploaded Photos number should be added!</Text>
      <Text style={styles.text}>
        Selected {selectedPhotos.length} Photos</Text>
      <MyButton title='Upload' textColor='white'
        backgroundColor={Colors.primary} onPress={() => {} } />
    </View>
  );
};

ProductDetailBaby.navigationOptions =props=> {
  return{
  headerTitle: 'Select Photos',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize:30,
    fontFamily: 'FontName',
    
  },
  headerRight: () =><HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item title='Profile' iconName='cart' onPress={() =>{
     props.navigation.navigate({routeName:'Cart'});
  }}/>
  </HeaderButtons>,
  headerBackTitle: null,
  headerBackTitleStyle: {
    fontWeight: 'bold',
    fontSize:20},
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  imageContainer: {
    width: 120,
    height: 120,
    margin: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  text:{
    fontFamily: 'FontName',
    fontWeight: 'bold',
    fontSize: 20,

  }
});

export default ProductDetailBaby;