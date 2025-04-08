import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { getToken, getUser } from '../helpers/asyncStorage';
import axios from 'axios';
import TrendingHP from '../components/TrendingHP';

const JoinedScreen = () => {
  const [joinedHackathons, setJoinedHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJoinedHackathons = async () => {
    try {
      const token = await getToken();
      const user = await getUser();

      if (!token || !user?.id) {
        Alert.alert("Error", "User not found or not logged in.");
        return;
      }

      const userId = user.id;

      const res = await axios.get(`http://192.168.29.218:8000/getUserHackathons/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setJoinedHackathons(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert('Error', 'Failed to fetch your joined hackathons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedHackathons();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {joinedHackathons.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
          You haven't joined any hackathons yet.
        </Text>
      ) : (
        <ScrollView>
          {joinedHackathons.map((item, idx) => (
            <TrendingHP key={idx} {...item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default JoinedScreen;
