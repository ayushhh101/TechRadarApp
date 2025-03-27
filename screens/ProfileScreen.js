// username , email , name , profilePic , city , skillset
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getUsername, getToken } from '../helpers/asyncStorage';
import axios from 'axios';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading Profile...</Text>
            </View>
        );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileBox}>
        <Text style={styles.title}>Profile</Text>
        <Text><Text style={styles.label}>Name:</Text> {userData.name}</Text>
        <Text><Text style={styles.label}>Username:</Text> {userData.username}</Text>
        <Text><Text style={styles.label}>Email:</Text> {userData.email}</Text>
        <Text><Text style={styles.label}>City:</Text> {userData.city}</Text>
        <Text>
  <Text style={styles.label}>Skillset:</Text> 
  {userData.skillset ? safelyParseJSON(userData.skillset).join(', ') : "Not specified"}
</Text>

      </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  profileBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;
