import React, { createContext, FC, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<{
    user: string;
    setUser: (user:string) => void;
    login: ({email, password} : LoginProps) => void;
    register: ({first_name, last_name, email, password} : RegisterProps) => void;
    logout: () => void;
}>({
    user: '',
    setUser: () => {},
    login: ({} : LoginProps) => {},
    register: ({} : RegisterProps) => {},
    logout: () => {},
}); 

interface AuthProviderProps {}

type User = null | {jwt: string};

type LoginProps = {
    email: string;
    password: string;
}

interface RegisterProps extends LoginProps {
    first_name: string;
    last_name: string;
}

const sendLoginData = async ({email, password} : LoginProps) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"email": email, "password": password})
    };
    const response = await fetch('http://172.18.0.1/auth/login', requestOptions);
    const data = await response.json();
    return data;
}

const loginHandler = async ({email, password} : LoginProps) => {
    if(email && password){
        try {
          const userJwt = await sendLoginData({email, password});
          if (userJwt) {
            Alert.alert(JSON.stringify(userJwt));
            console.log("login handler", userJwt);
            return userJwt;
          }
        } catch (e){
          console.log(e);
          return null;
        }
      } else {
        Alert.alert("Error", "Missing Fields");
        return null;
      }
} 

const sendRegisterData = async ({first_name, last_name, email, password} : RegisterProps) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"first_name": first_name, "last_name": last_name, "email": email, "password": password})
    };
    const response = await fetch('http://172.18.0.1/auth/register', requestOptions);
    console.log("neki neki");
    const data = await response.json();
    console.log(data);
    return data;
}

const registerHandler = async ({first_name, last_name, email, password} : RegisterProps) => {
    if(first_name && last_name && email && password){
        try {
          const userJwt = await sendRegisterData({first_name, last_name, email, password});
          if (userJwt) {
            Alert.alert(JSON.stringify(userJwt));
            console.log(userJwt);
            return userJwt;
          }
        } catch (e){
          console.log(e);
          return null;
        }
      } else {
        Alert.alert("Error", "Missing Fields");
        return null;
      }
} 

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>('');

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async ({email, password} : LoginProps) => {
                    const userJwt = await loginHandler({email, password})
                    console.log("login jwt: ", userJwt.jwt);
                    
                    if(userJwt){
                        //check for async storage try catch
                        try {
                            setUser((userJwt.jwt).toString());
                            await AsyncStorage.setItem("@user", JSON.stringify(userJwt))
                            console.log("async storage LOGIN USER SAVED");
                            console.log("user: ", user);
                          } catch(e) {
                            // remove error
                            console.log("error: " + e);
                          }
                    }
                },
                register: async ({first_name, last_name, email, password} : RegisterProps) => {
                    const userJwt = await registerHandler({first_name, last_name, email, password})
                    console.log("registered jwt: " + userJwt);

                    if(userJwt){
                        setUser(userJwt);
                        //check for async storage try catch
                        try {
                            await AsyncStorage.setItem("@user", JSON.stringify(userJwt))
                            console.log("async storage REGISTERED USER SAVED");
                            console.log(user);
                          } catch(e) {
                            // remove error
                            console.log(e);
                          }
                        
                    }
                },
                logout: async () => {
                    console.log(user);
                    setUser('');
                    
                    try {
                        await AsyncStorage.removeItem("@user");
                        console.log("async storage LOGOUT DELETED");
                        console.log(user);
                      } catch(e) {
                        // remove error
                        console.log(e);
                      }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}



