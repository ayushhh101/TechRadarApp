import React from 'react';
import { Text,View,Image ,TouchableOpacity} from 'react-native';
//import style from './styleHeader';
import style from './styleFooter';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseUser,faMagnifyingGlass,faClipboardList,faHeart} from '@fortawesome/free-solid-svg-icons'

const Footer = ({navigation }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={{ alignItems: 'center' }}>
                <FontAwesomeIcon size={30} icon={faHouseUser} />
                <Text>Home</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <View style={{ alignItems: 'center' }}>
                <FontAwesomeIcon size={30} icon={faMagnifyingGlass} />
                <Text>Search</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
            <View style={{ alignItems: 'center' }}>
                <FontAwesomeIcon size={30} icon={faHeart} />
                <Text>Wishlist</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Joined')}>
            <View style={{ alignItems: 'center' }}>
                <FontAwesomeIcon size={30} icon={faClipboardList} />
                <Text>Joined</Text>
            </View>
        </TouchableOpacity>
    </View>
    )
};

export default Footer;