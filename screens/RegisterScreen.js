import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { register } from '../helpers/authService'; // adjust path

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    city: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const alphaNumRegex = /^[a-zA-Z0-9 ]+$/;
    const validRoles = ['user', 'admin', 'organiser']; // or fetch from backend

    if (!form.username) newErrors.username = 'Username is required.';
    else if (!alphaNumRegex.test(form.username)) newErrors.username = 'Username must be alphanumeric.';

    if (!form.name) newErrors.name = 'Name is required.';
    else if (!alphaNumRegex.test(form.name)) newErrors.name = 'Name must be alphanumeric.';

    if (!form.email) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Invalid email format.';

    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!form.city) newErrors.city = 'City is required.';

    if (!form.role) newErrors.role = 'Role is required.';
    else if (!validRoles.includes(form.role.toLowerCase())) newErrors.role = 'Role must be user, admin, or organiser.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(
        form.username,
        form.email,
        form.password,
        form.name,
        form.city,
        form.role
      );
      Alert.alert('Success', 'Registration successful');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
    }
  };


  const renderInput = (label, name, value, isPassword = false, error = '') => (
    <Animatable.View
      animation={error ? 'shake' : 'fadeInUp'}
      duration={500}
      style={{ marginBottom: 20 }}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={(text) => handleChange(name, text)}
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
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Image
        animation="bounceInDown"
        duration={1200}
        source={require('../assests/techlogo1.jpg')}
        style={styles.logo}
      />
      <Animatable.Text animation="fadeIn" delay={200} style={styles.title}>
        TECHRADAR Registration
      </Animatable.Text>

      {renderInput('Username', 'username', form.username, false, errors.username)}
      {renderInput('Name', 'name', form.name, false, errors.name)}
      {renderInput('Email', 'email', form.email, false, errors.email)}
      {renderInput('Password', 'password', form.password, true, errors.password)}
      {renderInput('City', 'city', form.city, false, errors.city)}
      {renderInput('Role', 'role', form.role, false, errors.role)}
      <Text style={{ color: '#aaa', fontSize: 12, marginBottom: 10 }}>
        * Roles allowed: user, admin, organiser
      </Text>

      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.buttonWrapper}>
        <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerLink}>Already registered? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
