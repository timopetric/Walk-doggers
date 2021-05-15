import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../../screens/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen';
import { AuthParamList } from './AuthParamList';


const { Navigator, Screen } = createStackNavigator<AuthParamList>();

const AuthStack : FC = () => {
    return (
        <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Screen name="Register" component={RegisterScreen}/>
            <Screen name="Login" component={LoginScreen}/>
        </Navigator>
    )
}

export default AuthStack;