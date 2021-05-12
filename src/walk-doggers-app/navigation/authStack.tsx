import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const { Navigator, Screen } = createStackNavigator();

const AuthStack : FC = () => {
    return (
        <Navigator>
                <Screen name="register" component={RegisterScreen}/>
                <Screen name="login" component={LoginScreen}/>
        </Navigator>
    )
}

export default AuthStack;