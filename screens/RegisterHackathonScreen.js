import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import { getToken, getUser } from "../helpers/asyncStorage";

const RegisterHackathonScreen = ({ route, navigation }) => {
  const { hackathonId } = route.params;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teammates, setTeammates] = useState(""); // comma-separated string input

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

      // Parse teammate IDs from comma-separated string
      const teammateIds = teammates
        .split(",")
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id));

      if (teammateIds.length === 0) {
        Alert.alert("Error", "Please enter valid teammate IDs.");
        return;
      }

      const response = await axios.post(
        `http://192.168.29.218:8000/registerForHackathon/${hackathonId}`, // <-- FIXED
        {
          team_name: teamName.trim(), // 🔁 changed from teamName
          teammate_ids: teammateIds   // 🔁 changed from teammates
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

      <Text style={styles.infoLabel}>Team Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter team name"
        placeholderTextColor="#aaa"
        value={teamName}
        onChangeText={setTeamName}
      />

      <Text style={styles.infoLabel}>Teammate IDs (comma separated):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 12, 13, 14"
        placeholderTextColor="#aaa"
        value={teammates}
        onChangeText={setTeammates}
        keyboardType="numeric"
      />

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
  infoLabel: {
    color: "#64FFDA",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500"
  },
  input: {
    backgroundColor: "#1E2A38",
    color: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
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
