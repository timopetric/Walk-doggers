import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import LeaveFeedbackScreen from "../screens/Listings/LeaveFeedbackScreen";

const { Navigator, Screen } = createStackNavigator();

const AppStack : FC = () => {
    return (
        <Navigator>
                <Screen name="Root" component={BottomTabNavigator}/>

        </Navigator>
    )
}

export default AppStack;
