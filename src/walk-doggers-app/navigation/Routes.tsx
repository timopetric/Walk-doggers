import React, { useState, useEffect, useContext } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider } from "./Providers/AuthProvider";
import  Navigation  from "./index";
import  AuthStack  from "./AuthStack/AuthStack";
import useColorScheme from "../hooks/useColorScheme";
import RootNavigator from "./index";

interface RoutesProps {}


export const Routes: React.FC<RoutesProps> =  ({}) => {
  const colorScheme = useColorScheme();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [logedinUser, setLogedInUser] = useState('')

   useEffect(() => {
    // check if the user is logged in or not

    AsyncStorage.getItem("@user")
      .then(userString => {
        if (userString) {
          // decode it
          setLogedInUser(userString);
          setUser(userString)
          console.log("async routes :", logedinUser);
        }
        else {
            setLogedInUser('')
            console.log("logedinUser :", logedinUser);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);

  if (loading) {
    return (
        <ActivityIndicator size="large" />
    );
  }
  console.log("user: " + user);
  console.log("logedinuser: " + logedinUser);
  
  return (
    // Auth provider gives you global context for user jwt token
    <AuthProvider>
        <NavigationContainer>
        {user != '' ? <RootNavigator /> : <AuthStack />}
        </NavigationContainer>
    </AuthProvider>
  );
};