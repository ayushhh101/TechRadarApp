import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { login } from '../helpers/authService';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    let newErrors = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { user, token } = await login(username, password);
      Alert.alert('Login Successful');

      if (user.role === 'user') {
        navigation.replace('Home');
      } else if (user.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else if (user.role === 'organiser') {
        navigation.replace('OrganiserDashboard');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  const renderInput = (label, value, onChangeText, error, isPassword = false) => (
    <Animatable.View animation={error ? 'shake' : 'fadeInUp'} duration={500} style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          style={styles.input}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#00FFF7" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceInDown"
        duration={1200}
        source={require('../assests/techlogo1.jpg')}
        style={styles.logo}
      />
      <Animatable.Text animation="fadeIn" delay={200} style={styles.title}>
        TECHRADAR Login
      </Animatable.Text>

      {renderInput('Username', username, setUsername, errors.username)}
      {renderInput('Password', password, setPassword, errors.password, true)}

      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.buttonWrapper}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>New here? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A192C',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00FFF7',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    color: '#00FFF7',
    marginBottom: 5,
    fontSize: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#00FFF7',
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#00FFF7',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#00FFF7',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 10,
  },
  loginText: {
    color: '#0A192C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    color: '#00FFF7',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
});
