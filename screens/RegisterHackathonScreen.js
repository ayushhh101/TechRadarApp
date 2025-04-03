import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import { getToken, getUser } from "../helpers/asyncStorage";

const RegisterHackathonScreen = ({ route, navigation }) => {
  const { hackathonId } = route.params;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        if (!user) throw new Error("User data not found in AsyncStorage");
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRegister = async () => {
    try {
      const token = await getToken();
      if (!userData) throw new Error("User data not found");

      const response = await axios.post(
        "http://10.0.2.2:8000/registerForHackathon",
        {
          hackathonId,
          username: userData.username,
          email: userData.email,
          city: userData.city
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Success", response.data.message);
      navigation.goBack();
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Registration failed"
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for Hackathon</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Username:</Text>
        <Text style={styles.infoText}>{userData?.username}</Text>

        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{userData?.email}</Text>

        <Text style={styles.infoLabel}>City:</Text>
        <Text style={styles.infoText}>{userData?.city}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Confirm Registration</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0A192C"
  },
  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold"
  },
  infoContainer: {
    backgroundColor: "#1E2A38",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30
  },
  infoLabel: {
    color: "#64FFDA",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500"
  },
  infoText: {
    color: "white",
    fontSize: 18,
    marginBottom: 15
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18
  }
};

export default RegisterHackathonScreen;