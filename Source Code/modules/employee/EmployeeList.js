import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, View, StyleSheet, Text,TouchableOpacity, ActivityIndicator } from 'react-native';
import EmployeeCard from '../../constant/EmployeeCard';
import { getAllEmployee } from '../../api/Api';
import MyButton from '../../constant/MyButton';
import Colors from '../../constant/Colors';
import Entypo from '@expo/vector-icons/Entypo';

const EmployeeList = ({ navigation }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllEmployee();
      if (Array.isArray(data)) {
        setEmployeeData(data);
      } else {
        setEmployeeData([]);
      }
    } catch (err) {
      setEmployeeData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Bio')}>
            <Entypo name="add-user" size={24} color="white" />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

  if (loading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator style={styles.id} size="large" color={Colors.deepGreen} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
      {employeeData.length === 0 ? (
        <View>
          <Text style={styles.errorText}>Server is Busy!</Text>
          <Text style={styles.errorText}>Please Try Again.</Text>
        </View>
      ) : (
        employeeData.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))
      )}
      <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:30}}>
      <MyButton
        title="Refresh"
        textColor="white"
        backgroundColor= {Colors.primary}
        onPress={handleRefresh}
      />
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'White',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize:25,
    margin:5,
    fontFamily:'Bold',
  },
});

export default EmployeeList;





