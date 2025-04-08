import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import style from '../components/styleTrendingHP';
import * as Animatable from 'react-native-animatable'; // ✅ Import this

const TrendingHP = ({ id, clg, name, time, cost, seatRem, seatTotal, timeRem, city }) => {
    const navigation = useNavigation();

    return (
        <Animatable.View animation="flipInY" duration={900} style={{ marginVertical: 10 }}>
            <View style={[style.body]}>
                <View style={[style.bgs]}>
                    <View style={[style.view1]}>
                        <Image source={require('../assests/techdbit.jpg')} style={[style.img1]} />
                        <Text style={[style.clgName]}>{clg}</Text>
                        <Text style={[style.timeLeft]}>{timeRem} days left</Text>
                    </View>

                    <Text style={[style.contName]}>{name}</Text>
                    <Text style={[style.normal]}>City: {city}</Text>
                    <Text style={[style.normal]}>Duration: {time} hrs</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[style.normal]}>Cost: </Text>
                        <Text style={style.free}>{cost}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[style.normal]}>Seats Remaining: </Text>
                        <Text style={style.seats}>{seatRem}</Text>
                        <Text style={style.normal}> / </Text>
                        <Text style={style.seats}>{seatTotal}</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                            backgroundColor: "#FF5733",
                            padding: 10,
                            borderRadius: 5,
                            alignItems: "center"
                        }}
                        onPress={() => navigation.navigate("RegisterHackathon", { hackathonId: id })}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    );
};

export default TrendingHP;
