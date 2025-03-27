import React, { useEffect, useState } from 'react';
import { Text, View, Image, Alert ,TouchableOpacity } from 'react-native';
import { Menu, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import style from './styleHeader';
import { getToken ,getUsername, clearUserData} from '../helpers/asyncStorage';

const Header = ({ handleLogout }) => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await getUsername();
            if (storedUsername) {
                setUsername(storedUsername);
            }
        };
        fetchUsername();
    }, []);
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View style={[style.bg]}>
        <View style={[style.view1]}>
            <Image source={require('../assests/techlogo1.jpg')} style={[style.img1]} />
            <Text style={[style.text1]}>TECHRADAR</Text>

            {/* Dropdown Trigger on Profile Picture */}
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <TouchableOpacity onPress={openMenu} style={[style.profilio]}>
                        <Image source={require('../assests/techuser.jpg')} style={[style.img2]} />
                        <Text style={style.usernameText}>{username.length > 12 ? username.substring(0, 12) + "..." : username}</Text>
                    </TouchableOpacity>
                }
            >
                <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Profile'); }} title="Profile" />
                <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Settings'); }} title="Settings" />
                <Menu.Item onPress={() => { closeMenu(); navigation.navigate('RegisteredEvents'); }} title="Registered For" />
                <Divider />
                <Menu.Item 
                    title="Logout" 
                    onPress={handleLogout}
                    titleStyle={{ color: 'red' }} 
                />
            </Menu>
        </View>
    </View>
    );
};

export default Header;