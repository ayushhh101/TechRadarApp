import React from 'react';
import { Text, View, Image } from 'react-native';
import style from '../components/styleTrendingHP';

const TrendingHP = ({ clg, name, time, cost, seatRem, seatTotal, timeRem }) => {
    return (
        <View>
            <View style={[style.body]}>
                <View style={[style.bgs]}>
                    <View style={[style.view1]}>
                        <Image source={require('../assests/techdbit.jpg')} style={[style.img1]} />
                        <Text style={[style.clgName]}>{clg}</Text>
                        <Text style={[style.timeLeft]}>{timeRem} days left</Text>
                    </View>

                    <Text style={[style.contName]}>{name}</Text>
                    <Text style={[style.normal]}>Duration: {time} hrs</Text>

                    {/* Fix for Cost */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[style.normal]}>Cost: </Text>
                        <Text style={style.free}>{cost}</Text>
                    </View>

                    {/* Fix for Seats Remaining */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[style.normal]}>Seats Remaining: </Text>
                        <Text style={style.seats}>{seatRem}</Text>
                        <Text style={style.normal}> / </Text>
                        <Text style={style.seats}>{seatTotal}</Text>
                    </View>

                    <Text style={[style.reg]}>Register</Text>
                </View>
            </View>
        </View>
    );
};

export default TrendingHP;