import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from "@react-navigation/native";
import {MyListings} from "./MyListings"
import {Applied} from "./Applied"
import {GRAY_0, GRAY_1, PRIMARY, PRIMARY_DARKER} from "../../constants/Colors";

const Tab = createMaterialTopTabNavigator();

export default function TabListings() {
    const isFocused = useIsFocused();
    console.log(isFocused)
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator tabBarOptions={{
                activeTintColor: PRIMARY_DARKER,
                inactiveTintColor: GRAY_1,
                indicatorStyle: {backgroundColor: PRIMARY, height:2},
                tabStyle: {backgroundColor: null, height: 54},
                labelStyle: {fontWeight:"500", fontSize: 14}
            }}>
                <Tab.Screen name="MY LISTINGS" children={() => <MyListings isFocused={isFocused}/>}/>
                <Tab.Screen name="APPLIED" children={() => <Applied isFocused={isFocused}/>}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}


