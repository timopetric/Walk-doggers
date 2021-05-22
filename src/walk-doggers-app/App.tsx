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
import {BASE_API_URL} from "./localConstants";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
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
                case 'SET_ROLES':
                    return {
                        ...prevState,
                        admin: action.roles?.admin,
                        moderator: action.roles?.moderator,
                        reporter: action.roles?.reporter,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            admin: null,
            moderator: null,
            reporter: null
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
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

    React.useEffect(() => {
        // getRoles after loading jwt
        if (state.userToken !== null) {
            authContext.getRoles(state.userToken).then(r => console.log(r))
        }
    }, [state.userToken]);

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
                console.log("emv", process.env)
                const response = await fetch(BASE_API_URL + '/auth/login', requestOptions);
                if (response.ok) {
                    const responseData = await response.json();
                    await AsyncStorage.setItem("@user", responseData?.jwt);
                    await authContext.getRoles(responseData?.jwt);
                    dispatch({type: 'SIGN_IN', token: responseData?.jwt});
                } else {
                    alert('Wrong email or password!')
                }

            },
            getRoles: async (jwt: string) => {
                const token = jwt || state.userToken
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        "accept": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                };
                const response = await fetch(BASE_API_URL + '/auth/roles', requestOptions);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData)
                    await dispatch({type: 'SET_ROLES', roles: responseData});
                }
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
                const response = await fetch(BASE_API_URL + '/auth/register', requestOptions);
                if (response.ok) {
                    const responseData = await response.json();
                    await AsyncStorage.setItem("@user", responseData?.jwt);
                    await authContext.getRoles(responseData?.jwt);
                    dispatch({type: 'SIGN_IN', token: responseData?.jwt});
                } else {
                    alert('Wrong email or password!')
                }
            },
            getJwt: () => {
                return state.userToken;
            },
            isAdmin: (): boolean => {
                return state.admin;
            },
            isModerator: (): boolean => {
                return state.moderator;
            },
            isReporter: (): boolean => {
                return state.reporter;
            },

        }),
        [state.userToken, state.reporter, state.admin, state.morerator, []]
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
