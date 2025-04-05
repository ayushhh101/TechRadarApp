import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getToken } from '../helpers/asyncStorage';
import axios from 'axios';

const HackathonDetailsScreen = ({ route, navigation }) => {
  const { hackathon } = route.params;
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `http://10.0.2.2:8000/getHackathonRegistrations/${hackathon.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        Alert.alert('Error', 'Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [hackathon.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hackathon.name}</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Duration: {hackathon.time} hours</Text>
        <Text style={styles.detail}>Cost: ₹{hackathon.cost}</Text>
        <Text style={styles.detail}>Seats: {hackathon.seatRem}/{hackathon.seatTotal}</Text>
        <Text style={styles.detail}>Time Remaining: {hackathon.timeRem} days</Text>
      </View>

      <Text style={styles.sectionTitle}>Registered Users ({registrations.length})</Text>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading registrations...</Text>
      ) : registrations.length === 0 ? (
        <Text style={styles.emptyText}>No users registered yet</Text>
      ) : (
        <FlatList
          data={registrations}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userName}>{item.username}</Text>
              <Text style={styles.userDetail}>Email: {item.email}</Text>
              <Text style={styles.userDetail}>City: {item.city}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A192F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#1A2A3A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detail: {
    color: '#E6F1FF',
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64FFDA',
    marginBottom: 15,
  },
  userCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 8,
    padding: 15,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userDetail: {
    color: '#CCD6F6',
    fontSize: 14,
    marginBottom: 3,
  },
  separator: {
    height: 1,
    backgroundColor: '#2C3E50',
    marginVertical: 10,
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#8892B0',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HackathonDetailsScreen;