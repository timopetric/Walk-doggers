import React, { useState, useEffect, useContext, useRef } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider, useAuth } from "./Providers/AuthProvider";
import  Navigation  from "./index";
import  AuthStack  from "./AuthStack/AuthStack";
import useColorScheme from "../hooks/useColorScheme";
import RootNavigator from "./index";

interface RoutesProps {}


export const Routes: React.FC<RoutesProps> =  ({}) => {
  const colorScheme = useColorScheme();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [logedinUser, setLogedInUser] = useState('')

   useEffect(() => {
    // check if the user is logged in or not
    console.log("REEEEEEEEEEEEE REEEEEEEEEEEEEEEEEENDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER");
    AsyncStorage.getItem("@user")
      .then(userString => {
        if (userString) {
          // decode it
          //setUser({jwt: userString})
          console.log("async routes :", user);
        }
        else {
            console.log("no async item", user);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
        <ActivityIndicator size="large" />
    );
  }
  console.log("user: ", user);

  
  return (
    // Auth provider gives you global context for user jwt token
    <AuthProvider>
        <NavigationContainer>
        {user.jwt != null ? <RootNavigator /> : <AuthStack />}
        </NavigationContainer>
    </AuthProvider>
  );
};