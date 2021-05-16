import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import RootNavigator from "./navigation";
import AuthStack from "./navigation/AuthStack/AuthStack";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext, {LoginProps, RegisterProps} from './navigation/AuthContext';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // userToken = await SecureStore.getItemAsync('userToken');
                console.log("USERTOKEN")
                userToken = await AsyncStorage.getItem("@user");
                console.log(userToken);
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async ({email, password}: LoginProps) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"email": email, "password": password})
                };
                const response = await fetch('http://192.168.1.30/auth/login', requestOptions);
                const responseData = await response.json();
                // return data;
                console.log("data", responseData);
                await AsyncStorage.setItem("@user", responseData?.jwt);

                dispatch({type: 'SIGN_IN', token: responseData?.jwt});
            },
            signOut: async () => {
                await AsyncStorage.removeItem("@user")
                dispatch({type: 'SIGN_OUT'})
            },
            signUp: async ({email, password, firstName, lastName}: RegisterProps) => {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "first_name": firstName,
                        "last_name": lastName,
                        "email": email,
                        "password": password
                    })
                };
                const response = await fetch('http://192.168.1.30/auth/register', requestOptions);
                const responseData = await response.json();
                console.log("data", responseData);
                await AsyncStorage.setItem("@user", responseData?.jwt);

                dispatch({type: 'SIGN_IN', token: responseData?.jwt});
            },
            getJwt: () => {
                return state.userToken;
            }
        }),
        [state.userToken, []]
    );
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AuthContext.Provider value={authContext}>
                    {/*<Providers />*/}
                    <NavigationContainer>
                        {state.userToken == null ? <AuthStack/> : <RootNavigator/>}
                    </NavigationContainer>
                    <StatusBar/>
                </AuthContext.Provider>
            </SafeAreaProvider>
        );
    }
}
