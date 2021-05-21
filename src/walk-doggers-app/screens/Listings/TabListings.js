import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useIsFocused} from "@react-navigation/native";
import {MyListings} from "./MyListings"
import {Applied} from "./Applied"

const Tab = createMaterialTopTabNavigator();

export default function TabListings() {
  const isFocused = useIsFocused();
  console.log(isFocused)
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="MY LISTINGS" children={()=><MyListings isFocused={isFocused}/>} />
        <Tab.Screen name="APPLIED" children={()=><Applied isFocused={isFocused}/>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


