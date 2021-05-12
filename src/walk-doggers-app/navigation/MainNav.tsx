import React, { FC, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import AppStack from './appStack';
import AuthStack from './authStack';

const { Navigator, Screen } = createStackNavigator();

const MainNav : FC = () => {
    const [user, setUser] = useState(null);

    const getUser
    return ( 
        <NavigationContainer>
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default MainNav;