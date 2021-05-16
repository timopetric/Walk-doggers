import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

const { Navigator, Screen } = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator>
                <Screen name="Root" component={BottomTabNavigator}/>
        </Navigator>
    )
}

export default AppStack;