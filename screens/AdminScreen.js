import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { removeToken } from '../helpers/asyncStorage';
import axios from 'axios';

const AdminScreen = ({ navigation }) => {
  const [pendingHackathons, setPendingHackathons] = useState([]);
  const [approvedHackathons, setApprovedHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHackathons = async () => {
    try {
      setLoading(true);
      const [pendingRes, approvedRes] = await Promise.all([
        axios.get('http://10.0.2.2:8000/fetchPendingHackathons'),
        axios.get('http://10.0.2.2:8000/fetchApprovedHackathons')
      ]);
      setPendingHackathons(pendingRes.data);
      setApprovedHackathons(approvedRes.data);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      Alert.alert('Error', 'Failed to fetch hackathons');
    } finally {
      setLoading(false);
    }
  };

  const approveHackathon = async (id) => {
    try {
      await axios.patch(`http://10.0.2.2:8000/approveHackathon/${id}`);
      Alert.alert('Success', 'Hackathon approved successfully!');
      fetchHackathons(); // Refresh both lists
    } catch (error) {
      console.error('Error approving hackathon:', error);
      Alert.alert('Error', 'Failed to approve hackathon');
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    Alert.alert('Logged Out', 'You have been logged out successfully.');
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      
      {/* Pending Hackathons Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Approval</Text>
        
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : pendingHackathons.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.noHackathonsText}>No pending hackathons</Text>
          </View>
        ) : (
          <FlatList
            data={pendingHackathons}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.hackathonCard}>
                <Text style={styles.hackathonName}>{item.name}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Organizer:</Text>
                  <Text style={styles.hackathonDetail}>{item.organiserId}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.hackathonDetail}>{item.time} hours</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Registration Fee:</Text>
                  <Text style={styles.hackathonDetail}>₹{item.cost}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.approveButton}
                  onPress={() => approveHackathon(item.id)}
                >
                  <Text style={styles.approveButtonText}>Approve Hackathon</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      {/* Approved Hackathons Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Approved Hackathons</Text>
        
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : approvedHackathons.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.noHackathonsText}>No approved hackathons</Text>
          </View>
        ) : (
          <FlatList
            data={approvedHackathons}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.hackathonCard, { borderLeftColor: '#32CD32' }]}>
                <Text style={styles.hackathonName}>{item.name}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Organizer:</Text>
                  <Text style={styles.hackathonDetail}>{item.organiserId}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.hackathonDetail}>{item.time} hours</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Registration Fee:</Text>
                  <Text style={styles.hackathonDetail}>₹{item.cost}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <Text style={[styles.hackathonDetail, { color: '#32CD32' }]}>Approved</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  hackathonCard: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500', // Default orange for pending
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
  approveButton: {
    backgroundColor: '#32CD32',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminScreen;