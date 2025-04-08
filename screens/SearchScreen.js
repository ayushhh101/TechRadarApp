import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import TrendingHP from '../components/TrendingHP';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://192.168.29.218:8000/fetchHackathons');
        const approvedHackathons = response.data.filter(h => h.isApproved === 1);
        setHackathons(approvedHackathons);
        const uniqueCities = [...new Set(approvedHackathons.map(h => h.city).filter(Boolean))];
        setCityList(uniqueCities);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  const filteredHackathons = hackathons.filter(hackathon =>
    hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (cityQuery === '' || hackathon.city?.toLowerCase() === cityQuery.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0A192F' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        {/* 🔍 Search Header */}
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2200}
          easing="ease-in-out"
          style={{
            alignSelf: 'flex-start',
            marginBottom: 12,
            position: 'relative',
          }}
        >
          {/* Glowing Text Behind */}
          <Text
            style={{
              position: 'absolute',
              color: '#3B82F6',
              fontSize: 24,
              fontWeight: '700',
              opacity: 0.25,
              transform: [{ scale: 1.09 }],
            }}
          >
            Discover Hackathons
          </Text>

          {/* Main Text On Top */}
          <Text
            style={{
              color: '#F8FAFC',
              fontSize: 24,
              fontWeight: '700',
              textShadowColor: '#3B82F6',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 6,
            }}
          >
            Discover Hackathons
          </Text>
        </Animatable.View>


        {/* 🔍 Search Input */}
        <Animatable.View
          animation="fadeInDown"
          duration={500}
          delay={100}
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: 15,
            paddingHorizontal: 15,
            paddingVertical: Platform.OS === 'ios' ? 14 : 10,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6,
            elevation: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name="search" size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search Hackathons..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              color: 'white',
              fontSize: 16,
              flex: 1,
              padding: 0,
            }}
          />
        </Animatable.View>

        {/* 🌆 City Filters */}
        {cityList.length > 0 && (
          <Animatable.View animation="fadeInRight" duration={600}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}
              contentContainerStyle={{ gap: 10, paddingBottom: 4 }}
            >
              {['', ...cityList].map((city, index) => {
                const isActive = cityQuery === city || (city === '' && cityQuery === '');
                return (
                  <TouchableRipple
                    key={index}
                    onPress={() => setCityQuery(city)}
                    rippleColor="rgba(255, 255, 255, 0.2)"
                    style={{
                      backgroundColor: isActive ? '#2563EB' : 'rgba(255,255,255,0.06)',
                      borderColor: isActive ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                      borderWidth: 1,
                      paddingHorizontal: 18,
                      paddingVertical: 8,
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
                      {city === '' ? 'All Cities' : city}
                    </Text>
                  </TouchableRipple>
                );
              })}
            </ScrollView>
          </Animatable.View>
        )}

        {/* 📜 Hackathon List or Empty State */}
        {filteredHackathons.length === 0 ? (
          <Animatable.View
            animation="fadeIn"
            delay={200}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
              paddingHorizontal: 20,
            }}
          >
            <Icon name="sad-outline" size={60} color="#64748B" style={{ marginBottom: 12 }} />
            <Text style={{ color: '#94A3B8', fontSize: 16, textAlign: 'center' }}>
              No hackathons match your search or city filter.
            </Text>
          </Animatable.View>
        ) : (
          <FlatList
            data={filteredHackathons}
            keyExtractor={item => item.id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item, index }) => (
              <Animatable.View animation="fadeInUp" delay={index * 100}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('RegisterHackathon', { hackathonId: item.id })
                  }
                >
                  <TrendingHP {...item} />
                </TouchableOpacity>
              </Animatable.View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 10 }} />
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
