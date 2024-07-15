import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const PremiumToggle = () => {
  const [isPremium, setIsPremium] = useState(false);

  const toggleSwitch = () => {
    setIsPremium(previousState => !previousState);
  };
  const value = isPremium ? 15 : 10;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Laminated Photos:</Text>
      <Switch
        trackColor={{ false: '#767577', true: Colors.primary }}
        thumbColor={isPremium ? 'white' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isPremium}
      />
      <Text style={styles.label}>{isPremium ? 'Yes' : 'No'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight:'bold',

  },
});

export default PremiumToggle;
