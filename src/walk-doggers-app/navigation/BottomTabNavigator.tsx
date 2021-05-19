/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {PRIMARY, GRAY_2} from '../constants/Colors';

import useColorScheme from '../hooks/useColorScheme';
import TabExplore from '../screens/TabExplore';
import TabInbox from '../screens/TabInbox';

import {
    BlogParamList,
    BottomTabParamList,
    ExploreParamList,
    InboxParamList,
    ListingsParamList,
    SettingsParamList
} from '../types';
import TabBlog from "../screens/Blog/TabBlog";
import TabListings from "../screens/Listings/TabListings";
import TabSettings from "../screens/Settings/TabSettings";
import {Button} from 'react-native-elements';

import {Provider} from "react-redux";
import {store, toggleFilter} from "../redux/store";
import DogScreen from "../screens/DogScreen";
import NewBlogPostScreen from "../screens/Blog/NewBlogPostScreen";
import EditProfileScreen from "../screens/Settings/EditProfileScreen";
import BecomeAReporterScreen from "../screens/Settings/BecomeAReporterScreen";
import MyDogsScreen from "../screens/Settings/MyDogsScreen";
import NewDogScreen from "../screens/Settings/NewDogScreen";
import MessageScreen from '../screens/MessageScreen';
import BlogPostScreen from "../screens/Blog/BlogPostScreen";
import NewListingScreen from "../screens/Listings/NewListingScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Explore"
            tabBarOptions={{
                activeTintColor: PRIMARY, inactiveTintColor: GRAY_2,
                style: {
                    borderTopWidth: 0, shadowOpacity: 0.1,
                    shadowRadius: 6,
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                    elevation: 5,
                    // paddingTop: 10,
                    // paddingBottom: 10
                }
            }}>
            <BottomTab.Screen
                name="Explore"
                component={ExploreNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons size={27} style={{marginBottom: -3}} name="search"
                                                       color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Inbox"
                component={InboxNavigator}
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons size={27} style={{marginBottom: -3}} name="message"
                                                            color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Blog"
                component={BlogNavigator}
                options={{
                    tabBarIcon: ({color}) => <Entypo size={27} style={{marginBottom: -3}} name="text" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Listings"
                component={ListingsNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons size={27} style={{marginBottom: -3}} name="albums"
                                                       color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons size={28} style={{marginBottom: -3}} name="person-circle-outline"
                                                       color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

const ExploreStack = createStackNavigator<ExploreParamList>();

function ExploreNavigator() {
    return (
        <Provider store={store}>
            <ExploreStack.Navigator>
                <ExploreStack.Screen
                    name="ExploreScreen"
                    component={TabExplore}
                    options={{
                        headerTitle: 'Dogs for rent nearby',
                        headerTitleAlign: 'center',
                        ...headerWhiteBackground,
                        headerRight: () => (
                            <Button
                                onPress={() => store.dispatch(toggleFilter())}
                                icon={<Ionicons size={23} style={{marginBottom: -3}} name="filter" color={PRIMARY}/>}
                                type="clear"
                            />
                        ),
                    }}
                />
                <ExploreStack.Screen
                    name="DogScreen"
                    component={DogScreen}
                    options={{
                        headerTitle: ''
                    }}
                />
            </ExploreStack.Navigator>
        </Provider>
    );
}

const InboxStack = createStackNavigator<InboxParamList>();
const headerPrimaryBackground =
    {
        headerStyle: {
            backgroundColor: PRIMARY
        }
        ,
        headerTitleStyle: {
            color: "white"
        }
    };

const headerWhiteBackground =
    {
        headerStyle: {
            backgroundColor: 'white'
        }
        ,
        headerTitleStyle: {
            color: PRIMARY
        },
        headerTintColor: PRIMARY,
    };

function InboxNavigator() {
    return (
        <InboxStack.Navigator>
            <InboxStack.Screen
                name="InboxScreen"
                component={TabInbox}
                options={{
                    headerTitle: 'Inbox', headerTitleAlign: 'center',
                    ...headerPrimaryBackground
                }}
            />
            <InboxStack.Screen
                name="MessageScreen"
                component={MessageScreen}
                options={{headerShown: false,}}
            />
        </InboxStack.Navigator>
    );
}

const BlogStack = createStackNavigator<BlogParamList>();

function BlogNavigator({navigation}: any) {
    return (
        <BlogStack.Navigator>
            <BlogStack.Screen
                name="BlogScreen"
                component={TabBlog}
                options={{
                    headerTitle: 'Blog',
                    headerTitleAlign: 'center',
                    ...headerWhiteBackground,
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('NewBlogPostScreen')}
                            icon={<Entypo size={26} style={{marginBottom: -3}} name="plus" color={PRIMARY}/>}
                            type="clear"
                        />
                    ),
                }}
            />
            <BlogStack.Screen
                name="BlogPostScreen"
                component={BlogPostScreen}
                options={{
                    headerTitle: '',
                    ...headerWhiteBackground,
                }}
            />
            <BlogStack.Screen
                name="NewBlogPostScreen"
                component={NewBlogPostScreen}
                options={{
                    headerTitle: 'New Blog Post',
                    headerTitleAlign: 'center',
                    ...headerWhiteBackground,

                }}
            />
        </BlogStack.Navigator>
    );
}

const ListingsStack = createStackNavigator<ListingsParamList>();

function ListingsNavigator({navigation}: any) {
    return (
        <ListingsStack.Navigator>
            <ListingsStack.Screen
                name="ListingsScreen"
                component={TabListings}
                options={{
                    headerTitle: 'Listings',
                    headerTitleAlign: 'center',
                    ...headerWhiteBackground,
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('NewListingScreen')}
                            icon={<Entypo size={30} style={{marginBottom: -3}} name="plus" color={PRIMARY}/>}
                            type="clear"
                        />
                    ),
                }}
            />
            <ListingsStack.Screen
                name="NewListingScreen"
                component={NewListingScreen}
                options={{
                    headerTitle: 'New Listing',
                    headerTitleAlign: 'center',
                    ...headerWhiteBackground,
                }}
            />
            <ListingsStack.Screen
                name="NewDogScreenListings"
                component={NewDogScreen}
                options={{
                    headerTitle: 'New Dog', headerTitleAlign: 'center', ...headerWhiteBackground,
                }}
            />
        </ListingsStack.Navigator>
    );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator({navigation}: any) {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsScreen"
                component={TabSettings}
                options={{
                    headerTitle: 'Settings', headerTitleAlign: 'center', ...headerWhiteBackground,
                }}
            />
            <SettingsStack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                    headerTitle: 'Edit Profile', headerTitleAlign: 'center', ...headerWhiteBackground,
                }}
            />
            <SettingsStack.Screen
                name="MyDogsScreen"
                component={MyDogsScreen}
                options={{
                    headerTitle: 'My Dogs',
                    headerTitleAlign: 'center',
                    ...headerWhiteBackground,
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('NewDogScreen')}
                            icon={<Entypo size={30} style={{marginBottom: -3}} name="plus" color={PRIMARY}/>}
                            type="clear"
                        />
                    ),
                }}
            />
            <SettingsStack.Screen
                name="BecomeAReporterScreen"
                component={BecomeAReporterScreen}
                options={{
                    headerTitle: 'Become a Reporter', headerTitleAlign: 'center', ...headerWhiteBackground,
                }}
            />
            <SettingsStack.Screen
                name="NewDogScreen"
                component={NewDogScreen}
                options={{
                    headerTitle: 'New Dog', headerTitleAlign: 'center', ...headerWhiteBackground,
                }}
            />
        </SettingsStack.Navigator>
    );
}
