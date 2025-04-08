import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { getToken } from '../helpers/asyncStorage';
import axios from 'axios';

const HackathonDetailsScreen = ({ route }) => {
  const { hackathon } = route.params;
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `http://192.168.29.218:8000/getHackathonRegistrations/${hackathon.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        Alert.alert('Error', 'Failed to load team registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [hackathon.id]);

  const renderTeam = ({ item }) => {
    const teammateIds = item.teammate_ids
      ? item.teammate_ids.split(',').filter(id => id.trim() !== '')
      : [];

    return (
      <View style={styles.teamCard}>
        <Text style={styles.teamName}>Team: {item.team_name}</Text>
        <Text style={styles.member}>Leader ID: {item.user_id}</Text>

        <Text style={styles.member}>Teammate IDs:</Text>
        {teammateIds.length > 0 ? (
          teammateIds.map((id, index) => (
            <Text key={index} style={styles.teammate}>
              - User ID: {id}
            </Text>
          ))
        ) : (
          <Text style={styles.teammate}>No teammates</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hackathon.name}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Duration: {hackathon.time} hours</Text>
        <Text style={styles.detail}>Cost: ₹{hackathon.cost}</Text>
        <Text style={styles.detail}>Seats: {hackathon.seatRem}/{hackathon.seatTotal}</Text>
        <Text style={styles.detail}>Time Remaining: {hackathon.timeRem} days</Text>
      </View>

      <Text style={styles.sectionTitle}>Registered Teams ({teams.length})</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading teams...</Text>
      ) : teams.length === 0 ? (
        <Text style={styles.emptyText}>No teams registered yet</Text>
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTeam}
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
  teamCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 8,
    padding: 15,
  },
  teamName: {
    color: '#64FFDA',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  member: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 3,
  },
  teammate: {
    color: '#CCD6F6',
    fontSize: 13,
    marginLeft: 10,
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
