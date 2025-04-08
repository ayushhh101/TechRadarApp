import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import { getToken, removeToken } from '../helpers/asyncStorage';
import style from '../screensCSS/HomeScreen';
import Header from '../components/Header';
import TrendingHP from '../components/TrendingHP';
import Footer from '../components/Footers';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Trending';
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [devNews, setDevNews] = useState([]);

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

  useEffect(() => {
    const fetchDevToArticles = async () => {
      try {
        const res = await fetch('https://dev.to/api/articles?tag=hackathon&per_page=5');
        const data = await res.json();
        setDevNews(data);
      } catch (err) {
        console.error('Failed to fetch Dev.to articles:', err);
      }
    };
    fetchDevToArticles();
  }, []);

  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150;
    const timeout = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.substring(0, index - 1));
        setIndex(index - 1);
      } else {
        setIsDeleting(!isDeleting);
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const handleLogout = async () => {
    await removeToken();
    Alert.alert('Logged Out');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <Header handleLogout={handleLogout} />

        {/* Main scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Animatable.Text
            animation="fadeInDown"
            duration={500}
            style={style.heading}
          >
            {typedText}
            <Text style={{ color: '#0A192C' }}>|</Text>
          </Animatable.Text>

          {/* Trending Cards */}
          {/* Trending Cards */}
<View style={{ height: 300, marginVertical: 10 }}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 16 }}
  >
    {[
      { clg: 'D.B.I.T', name: 'CodeVerse', time: '24', cost: 'Free', seatRem: 12, seatTotal: 100, timeRem: 2 },
      { clg: 'S.P.I.T', name: 'CodeBusters', time: '2', cost: 'Rs50', seatRem: 2, seatTotal: 40, timeRem: 3 },
      { clg: 'V.E.S.I.T', name: 'CoderQuest', time: '2', cost: 'Rs250', seatRem: 20, seatTotal: 50, timeRem: 5 },
    ].map((item, idx) => (
      <Animatable.View
        key={idx}
        animation="flipInY"
        delay={idx * 300}
        duration={800}
        style={{ marginRight: 14 }}
      >
        <TrendingHP {...item} />
      </Animatable.View>
    ))}
  </ScrollView>
</View>


          {/* Tip Box */}
          <View style={{
            backgroundColor: '#e0f2fe',
            margin: 10,
            padding: 14,
            borderRadius: 16,
            shadowColor: '#38bdf8',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
          }}>
            <Text style={{ fontSize: 16, color: '#0f172a' }}>
              💡 Tip of the Day: Build something that solves *your* pain point first.
            </Text>
          </View>

          {/* Dev.to News Feed */}
          <View style={{ marginVertical: 10, paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#0f172a' }}>
              📰 Hackathon News
            </Text>
            {devNews.map((article, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 200}
                style={{
                  backgroundColor: '#f8fafc',
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: '#0ea5e9',
                }}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    color: '#0284c7',
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => Linking.openURL(article.url)}
                >
                  {article.title}
                </Text>
                <Text style={{ color: '#475569', fontSize: 12 }}>by {article.user.name}</Text>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Footer */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Footer navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
