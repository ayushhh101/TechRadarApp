import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import TrendingHP from '../components/TrendingHP';
import axios from 'axios';

// const dummyHackathons = [
//   { id: '1', name: 'Eureka Hacks', time: '36', cost: 'Rs 200', seatRem: 100, seatTotal: 100, timeRem: 30 },
//   { id: '2', name: 'Horizon Hack', time: '48', cost: 'Rs 150', seatRem: 75, seatTotal: 75, timeRem: 45 },
//   { id: '3', name: 'InnovateX', time: '24', cost: 'Rs 250', seatRem: 50, seatTotal: 50, timeRem: 60 },
//   { id: '4', name: 'TechStorm', time: '30', cost: 'Rs 100', seatRem: 120, seatTotal: 120, timeRem: 20 },
//   { id: '5', name: 'CodeSprint', time: '36', cost: 'Rs 100', seatRem: 60, seatTotal: 60, timeRem: 80 },
//   { id: '6', name: 'HackOverflow', time: '48', cost: 'Rs 200', seatRem: 90, seatTotal: 90, timeRem: 15 },
//   { id: '7', name: 'CodeFusion', time: '36', cost: 'Rs 150', seatRem: 80, seatTotal: 80, timeRem: 25 },
//   { id: '8', name: 'Xavathon', time: '30', cost: 'Rs 180', seatRem: 70, seatTotal: 70, timeRem: 35 },
//   { id: '9', name: 'TechThrust', time: '24', cost: 'Rs 120', seatRem: 90, seatTotal: 90, timeRem: 50 },
//   { id: '10', name: 'CodeWave', time: '48', cost: 'Rs 130', seatRem: 100, seatTotal: 100, timeRem: 40 },
//   { id: '11', name: 'Innovathon', time: '36', cost: 'Rs 180', seatRem: 85, seatTotal: 85, timeRem: 55 },
//   { id: '12', name: 'HackMania', time: '30', cost: 'Rs 140', seatRem: 95, seatTotal: 95, timeRem: 60 }
// ];

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/fetchHackathons');
        console.log(response.data);
        const approvedHackathons = response.data.filter(hackathon => hackathon.isApproved === 1);
        approvedHackathons.map(hackathon => console.log(hackathon));
        setHackathons(approvedHackathons);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  const filteredHackathons = hackathons.filter(hackathon =>
    hackathon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#0A192C' }}>
      <TextInput
        style={{
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          fontSize: 18,
          color: 'white',
          backgroundColor: '#1E2A38'
        }}
        placeholder="Search Hackathons..."
        placeholderTextColor="#A0A0A0"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      
      {filteredHackathons.length === 0 ? (
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 20, fontSize: 18 }}>No hackathons found</Text>
      ) : (
        <FlatList
          data={filteredHackathons}
          keyExtractor={item => item.id?.toString()}
          renderItem={({ item }) => 
          <TrendingHP 
          {...item} 
          onRegister={() => navigation.navigate('RegisterHackathon', { hackathonId: item.id })}
          />}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: 'white', marginVertical: 8, opacity: 0.5 }} />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;