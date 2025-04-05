import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import WishlistScreen from './screens/WishlistScreen';
import JoinedScreen from './screens/JoinedScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import OrganiserScreen from './screens/OrganiserScreen';
import RegisterHackathonScreen from './screens/RegisterHackathonScreen';
import HackathonDetailsScreen from './screens/HackathonDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>  {/* Wrap your app with this */}
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Joined" component={JoinedScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminScreen} />
        <Stack.Screen name="OrganiserDashboard" component={OrganiserScreen} />
        <Stack.Screen name="RegisterHackathon" component={RegisterHackathonScreen} />
        <Stack.Screen name="HackathonDetails" component={HackathonDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
