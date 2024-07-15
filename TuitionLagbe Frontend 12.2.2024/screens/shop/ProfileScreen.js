import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {  getTeacher } from './service/APIService';
import { resetInAppId} from '../../store/actions/teachers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getStudent } from './service/StudentAPIService';

const ProfileScreen = (props) => {
  const isTeacher = useSelector((state)=> state.products.isTeacher);
  const inAppId = useSelector((state) => state.products.inAppId);
  const [consumerName,setConsumerName]= useState();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const dispatch = useDispatch();

  const photoDirectory = `${FileSystem.documentDirectory}profilePhotos/`;
  const photoFileName = 'ProfilePic.jpeg';
  const profilePhotoPath = `${photoDirectory}${photoFileName}`;

  useEffect(() => {
    (async () => {
      const directoryInfo = await FileSystem.getInfoAsync(photoDirectory);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(photoDirectory, { intermediates: true });
      }
    })();
  }, []);

  const pickPhotoHandler = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please grant permission to access your media library.');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      if (result.assets.length > 0) {
        const selectedPhotoUri = result.assets[0].uri;

        try {
          await FileSystem.deleteAsync(profilePhotoPath, { idempotent: true });
          await FileSystem.moveAsync({
            from: selectedPhotoUri,
            to: profilePhotoPath,
          });
          setSelectedPhoto(new Date().getTime());
          Alert.alert('Success', 'Photo successfully updated.');
          
        } catch (error) {
          console.error('Error moving the photo:', error);
          Alert.alert('Error', 'An error occurred while updating the photo.');
        }
      } else {
        Alert.alert('Error', 'No assets selected.');
      }
    }
  };
  
  const handleTuitionInfo = () => {
    props.navigation.navigate("TuitionDetails");
  };
  const handleEditProfile = () => {
    if(isTeacher)
    {
       props.navigation.navigate("Register");
    }
    else
    {
      props.navigation.navigate("StudentRegister");
    }
   
  };
    const handleLogOut = () => {
      dispatch(resetInAppId());
      props.navigation.replace({ routeName: 'Login' });
    };

    const getData = async () => {
      try {
        const res = await getTeacher(inAppId);
         setConsumerName(res.data.name)
      } catch (error) {
        console.log(error);
        setErrorMessage(true);
      }
    };

    const getStudentData = async () => {
      try {
        const res = await getStudent(inAppId);
         setConsumerName(res.data.studentName)
      } catch (error) {
        console.log(error);
        setErrorMessage(true);
      }
    }

    useEffect(() => {
      if (inAppId !== 0) {
        if(isTeacher)
        {
          getData();
        }
        else
        {
          getStudentData();
        }
        
      }
    }, [inAppId]);

  return (
    <View style={styles.container}>

      <View style={styles.circleContainer}>
      <View style={styles.greenCircle}/>
      <Image
        style={styles.profileImage}
        source={{uri: `${profilePhotoPath}?${Math.random()}`}}
      />
      </View>

      <Text style={styles.name}>{consumerName}</Text>
      {/* <View style={styles.ratingContainer}>
        <Text style={styles.rating}>4.8</Text>
        <Text style={styles.ratingLabel}>/5</Text>
      </View> */}


      <TouchableOpacity
        style={styles.changeProfilePicButton}
        onPress={pickPhotoHandler}>
    <Text style={styles.text}>Change Profile Picture</Text>
      </TouchableOpacity>
     
      <TouchableOpacity
        style={styles.changeProfilePicButton}
        onPress={handleEditProfile}>
     <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
      

      <TouchableOpacity
        style={styles.changeProfilePicButton}
        onPress={handleTuitionInfo}>
        <Text style={styles.text}>Tuition Info</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.changeProfilePicButton}
        onPress={()=>{}}>
        <Text style={styles.text}>Review</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={styles.changeProfilePicButton}
        onPress={()=>{}}>
        <Text style={styles.text}>Suggestion</Text>
      </TouchableOpacity> */}


      <TouchableOpacity
        style={styles.changeProfilePicButton}
        onPress={()=>{}}>
        <Text style={styles.text}>About</Text>
      </TouchableOpacity>


      {/* <MyButton title="Emergency" onPress={() => {}} 
       backgroundColor={Colors.deepYellow} textColor='white'/>
      <MyButton title="Match My Location" onPress={() => {}}
       backgroundColor={Colors.primary} textColor='white'/> */}
      <MyButton title="Log out" onPress={handleLogOut}
       backgroundColor='red' textColor='white'/>
    </View>
  );
}
ProfileScreen.navigationOptions = props => {
    return {
      headerTitle: 'Profile',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 30,
        fontFamily: 'Bold',
      },
      headerBackTitleVisible: false,
    };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  circleContainer: {
    position: 'relative',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
  },
  greenCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: 'green',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
  changeProfilePicButton: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: Colors.primary,
    height: 30,
    borderRadius:10,
    width: '70%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:Colors.accent,
    shadowColor: 'black',
    shadowOpacity: 0.46,
    textShadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,
  },
  text:{
    fontFamily:'Medium',
    color:'black',
  },
});

export default ProfileScreen;
