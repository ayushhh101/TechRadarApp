import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getUsername } from '../helpers/asyncStorage';
import * as Animatable from 'react-native-animatable';
import style from './styleHeader';

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
    <View style={style.bg}>
      <View style={style.view1}>
        
        {/* Logo & Title Animation */}
        <Animatable.View animation="fadeInLeft" duration={700} delay={100} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assests/techlogo1.jpg')} style={style.img1} />
          <Text style={style.text1}>TECHRADAR</Text>
        </Animatable.View>

        {/* Menu Anchor: keep it vanilla (NO animation directly here) */}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={style.profilio}>
              {/* Animate ONLY inner contents */}
              <Animatable.View animation="fadeInRight" duration={700} delay={200} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assests/techuser.jpg')} style={style.img2} />
                <Text style={style.usernameText}>
                  {username.length > 12 ? username.substring(0, 12) + "..." : username}
                </Text>
              </Animatable.View>
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
