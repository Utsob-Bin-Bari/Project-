import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, ScrollView,Keyboard} from 'react-native';
import Colors from '../../constants/Colors'; 
import MyButton from '../../constants/MyButton';
import PlusMinusButton from '../../constants/PlusMinus';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

const CartScreen = ({ navigation }) => {
  const selectedPhotosLength = navigation.getParam('selectedPhotosLength', 0);
  const isPremium = navigation.getParam('isPremium', false);
  const [numOfAlbums, setNumOfAlbums] = useState(1);
  const [contactNumber, setContactNumber] = useState('');
  const [orderAddress, setOrderAddress] = useState('');

  const increaseAlbums = () => {
    setNumOfAlbums(numOfAlbums + 1);
  };

  const decreaseAlbums = () => {
    if (numOfAlbums > 1) {
      setNumOfAlbums(numOfAlbums - 1);
    }
  };

  const subtotal = selectedPhotosLength * 10 * numOfAlbums;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={styles.container} horizontal={false}>
        <Text style={styles.title}>Cart</Text>

        {selectedPhotosLength === 0 ? (
          <Text style={styles.text}>Here, we need to render the pending Order List from the server</Text>
        ) : (
          <View>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Selected Photos</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.text}>{selectedPhotosLength}</Text>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Laminated</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.text}>{isPremium ? 'Yes' : 'No'}</Text>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Albums</Text>
              </View>
              <View style={styles.sectionContent}>
                <PlusMinusButton
                  title="  +  "
                  backgroundColor={Colors.accent}
                  textColor="white"
                  onPress={increaseAlbums}
                />
                <Text style={styles.text}>{numOfAlbums}</Text>
                <PlusMinusButton
                  title="  -  "
                  backgroundColor={Colors.accent}
                  textColor="white"
                  onPress={decreaseAlbums}
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Contact Number</Text>
              </View>
              <View style={styles.sectionContent}>
                <TextInput
                  style={styles.input}
                  placeholder="+880"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>


            <View style={styles.sectionContainer}>
              <View style={styles.sectionLabel}>
                <Text style={styles.text}>Order Location</Text>
              </View>
              <View style={styles.sectionContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Select Your Location"
                  value={orderAddress}
                  onChangeText={setOrderAddress}
                  keyboardType="phone-pad"
                  onResponderRelease={() => Keyboard.dismiss()}
                />
              </View>
            </View>

            <View style={styles.subtotalContainer}>
              <View style={styles.subtotalLabel}>
                <Text style={styles.text}>Subtotal</Text>
              </View>
              <View>
                <Text style={styles.subtotalAmount}>{subtotal} BDT</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <MyButton
                title="Select Your Location"
                textColor="white"
                backgroundColor={Colors.primary}
                onPress={() => {
                  navigation.navigate({ routeName: 'Location' });
                }}
              />
              <Text style={styles.text}>Payment Module</Text>
              <MyButton
                title="Confirm Order"
                textColor="white"
                backgroundColor={Colors.primary}
                onPress={() => {}}
              />
            </View>

            <Text style={styles.text}>Here, we need to render the pending Order List from the server</Text>
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};



CartScreen.navigationOptions = props => {
  return{
  headerTitle: 'Cart',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize:30,
    fontFamily: 'FontName',
    
  },
  headerRight: () =><HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item title='Home' iconName='home' onPress={() =>{
     props.navigation.navigate({routeName:'ProductsOverview'});
  }}/>
  </HeaderButtons>,
  headerBackTitle: null,
  headerBackTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'FontName',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'FontName',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  sectionLabel: {
    flex: 1,
    marginRight: 10,
  },
  sectionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  subtotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  subtotalLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtotalAmount: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    fontFamily: 'FontName',
  },
});

export default CartScreen;


