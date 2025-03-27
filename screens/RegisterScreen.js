import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { register } from '../helpers/authService';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, email, password, name, city);
      Alert.alert('Registration Successful');
      navigation.replace('Login');
    } catch (error) {
      console.log(error)
      Alert.alert('Registration Failed' );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} placeholder="Enter username" />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Enter email" />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Enter name" />
      <Text>City:</Text>
      <TextInput value={city} onChangeText={setCity} placeholder="Enter city" />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
