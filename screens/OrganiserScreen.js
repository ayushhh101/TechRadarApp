import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { getToken, removeToken, getUser } from '../helpers/asyncStorage';
import axios from 'axios';

const OrganiserScreen = ({ navigation }) => {
  const [hackathon, setHackathon] = useState({
    name: '',
    time: '',
    cost: '',
    seatRem: '',
    seatTotal: '',
    timeRem: ''
  });

  const [organiserHackathons, setOrganiserHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //GET USER DATA
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      setUser(userData);
      await fetchOrganiserHackathons();
    };
    fetchData();
  }, []);

  // Fetch organiser's hackathons
  useEffect(() => {
    const fetchOrganiserHackathons = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://10.0.2.2:8000/organiserHackathons', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrganiserHackathons(response.data);
      } catch (error) {
        console.error('Error fetching organiser hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganiserHackathons();
  }, []);

  const handleChange = (field, value) => {
    setHackathon({ ...hackathon, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await getToken();
      const response = await axios.post('http://10.0.2.2:8000/addHackathon',
        hackathon,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      Alert.alert('Success', 'Hackathon added successfully!');
      setHackathon({ name: '', time: '', cost: '', seatRem: '', seatTotal: '', timeRem: '' });
    } catch (error) {
      console.error('Error adding hackathon:', error);
      Alert.alert('Error', 'Failed to add hackathon');
    }
  };

  const handleLogout = async () => {
    await removeToken();
    Alert.alert('Logged Out', 'You have been logged out successfully.');
    navigation.replace('Login');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Welcome, {user?.username || 'Organizer'}</Text>

        {/* Add Hackathon Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Hackathon</Text>
          {Object.keys(hackathon).map((field) => (
            <View key={field} style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                placeholderTextColor="#A0A0A0"
                value={hackathon[field]}
                onChangeText={(value) => handleChange(field, value)}
                keyboardType={field === 'cost' || field.includes('seat') || field.includes('time') ? 'numeric' : 'default'}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Hackathon</Text>
          </TouchableOpacity>
        </View>

        {/* Your Hackathons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Hackathons</Text>
          {organiserHackathons.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.noHackathonsText}>No hackathons found</Text>
            </View>
          ) : (
            <FlatList
              data={organiserHackathons}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.hackathonCard}
                  onPress={() => navigation.navigate('HackathonDetails', { hackathon: item })}
                >
                  <View style={styles.hackathonCard}>
                    <Text style={styles.hackathonName}>{item.name}</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Time:</Text>
                      <Text style={styles.hackathonDetail}>{item.time} hours</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Cost:</Text>
                      <Text style={styles.hackathonDetail}>₹{item.cost}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Seats:</Text>
                      <Text style={styles.hackathonDetail}>{item.seatRem}/{item.seatTotal} remaining</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Time Remaining:</Text>
                      <Text style={styles.hackathonDetail}>{item.timeRem} days</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A192F',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#1A2A3A',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64FFDA',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3E50',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    color: '#CCD6F6',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#2C3E50',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#E6F1FF',
    backgroundColor: '#1E2A3A',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  hackathonCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#64FFDA',
  },
  hackathonName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    color: '#8892B0',
    fontSize: 14,
  },
  hackathonDetail: {
    color: '#E6F1FF',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHackathonsText: {
    color: '#8892B0',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  hackathonCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#64FFDA',
    // Add these:
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
},
});

export default OrganiserScreen;
