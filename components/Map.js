import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const cityCoordinates = {
  Mumbai: { latitude: 19.0760, longitude: 72.8777 },
  Delhi: { latitude: 28.6139, longitude: 77.2090 },
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Hyderabad: { latitude: 17.3850, longitude: 78.4867 },
  Pune: { latitude: 18.5204, longitude: 73.8567 },
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
  Kolkata: { latitude: 22.5726, longitude: 88.3639 },
  Jaipur: { latitude: 26.9124, longitude: 75.7873 },
};

const HackathonMap = ({ hackathons }) => {
  const getCityCoords = (city) => cityCoordinates[city];

  const initialCity = hackathons.find(h => cityCoordinates[h.city]);
  const initialRegion = initialCity
    ? {
        ...cityCoordinates[initialCity.city],
        latitudeDelta: 10,
        longitudeDelta: 10,
      }
    : {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 20,
        longitudeDelta: 20,
      };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {hackathons.map((hackathon, index) => {
          const coords = getCityCoords(hackathon.city);
          if (!coords) return null;

          return (
            <Marker
              key={index}
              coordinate={coords}
              title={hackathon.title}
              description={hackathon.city}
              pinColor="tomato"
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: Dimensions.get('window').width,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HackathonMap;
