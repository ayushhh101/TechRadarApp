import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getUser } from '../helpers/asyncStorage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  const safelyParseJSON = (json) => {
    try {
      return JSON.parse(json) || [];
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await getUser();
        if (storedUser) {
          setUserData(storedUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.bg}>
        <ActivityIndicator size="large" color="#00FFFF" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
          <Text style={styles.title}>Profile</Text>

          {userData.profilePic && (
            <Image source={{ uri: userData.profilePic }} style={styles.avatar} />
          )}

          <Text style={styles.label}>User ID</Text>
          <Text style={styles.info}>{userData._id || userData.id || "N/A"}</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.info}>{userData.name}</Text>

          <Text style={styles.label}>Username</Text>
          <Text style={styles.info}>{userData.username}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{userData.email}</Text>

          <Text style={styles.label}>City</Text>
          <Text style={styles.info}>{userData.city || 'Not specified'}</Text>

          <Text style={styles.label}>Skillset</Text>
          <View style={styles.skillContainer}>
            {userData.skillset
              ? safelyParseJSON(userData.skillset).map((skill, idx) => (
                  <View key={idx} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))
              : <Text style={styles.info}>Not specified</Text>}
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#161b22',
    padding: 25,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#00ffff44',
    shadowColor: '#00ffff',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00FFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#8b949e',
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
  },
  info: {
    fontSize: 16,
    color: '#ffffff',
  },
  loadingText: {
    color: '#00FFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10,
  },
  skillBadge: {
    backgroundColor: '#00ffff22',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#00ffffaa',
  },
  skillText: {
    color: '#00FFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ProfileScreen;
