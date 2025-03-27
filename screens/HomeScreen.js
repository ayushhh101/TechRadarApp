import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Alert, Image, ScrollView, Button } from 'react-native';
import { getToken, removeToken } from '../helpers/asyncStorage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle, faHome, faSearch, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import style from '../screensCSS/HomeScreen';
import Header from '../components/Header';
import { useLayoutEffect } from 'react';
import TrendingHP from '../components/TrendingHP';
import Footer from '../components/Footers';

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    Alert.alert('Logged Out');
    navigation.replace('Login');
  };

  return (
    // <View style={{ padding: 20 }}>
    //   <Text>Welcome to Home Screen</Text>
    //   {token ? <Text>Token: {token.substring(0, 20)}...</Text> : <Text>No Token</Text>}
    //   <Button title="Logout" onPress={handleLogout} />
    // </View>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[style.mainbg, { flex: 1, justifyContent: 'space-between' }]}>
        <Header handleLogout={handleLogout}/>
        <Text style={[style.heading]}>Trending📈</Text>

        <View style={{ flex: 1 }}>
          <ScrollView horizontal={true}>
            <TrendingHP clg="D.B.I.T" name="CodeVerse" time="24" cost="Free" seatRem={12} seatTotal={100} timeRem={2} />
            <TrendingHP clg="S.P.I.T" name="CodeBusters" time="2" cost="Rs50" seatRem={2} seatTotal={40} timeRem={3} />
            <TrendingHP clg="V.E.S.I.T" name="CoderQuest" time="2" cost="Rs250" seatRem={20} seatTotal={50} timeRem={5} />
          </ScrollView>
        </View>

        <Footer navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
