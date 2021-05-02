/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
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
import TabBlog from "../screens/TabBlog";
import TabListings from "../screens/TabListings";
import TabSettings from "../screens/TabSettings";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
            name="Explore"
            component={ExploreNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Inbox"
            component={InboxNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Blog"
            component={BlogNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Listings"
            component={ListingsNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Settings"
            component={SettingsNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ExploreStack = createStackNavigator<ExploreParamList>();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreScreen"
        component={TabExplore}
        options={{ headerTitle: 'Explore Title' }}
      />
    </ExploreStack.Navigator>
  );
}

const InboxStack = createStackNavigator<InboxParamList>();

function InboxNavigator() {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen
        name="InboxScreen"
        component={TabInbox}
        options={{ headerTitle: 'Inbox Title' }}
      />
    </InboxStack.Navigator>
  );
}

const BlogStack = createStackNavigator<BlogParamList>();

function BlogNavigator() {
    return (
        <BlogStack.Navigator>
            <BlogStack.Screen
                name="BlogScreen"
                component={TabBlog}
                options={{ headerTitle: 'Blog Title' }}
            />
        </BlogStack.Navigator>
    );
}

const ListingsStack = createStackNavigator<ListingsParamList>();

function ListingsNavigator() {
    return (
        <ListingsStack.Navigator>
            <ListingsStack.Screen
                name="ListingsScreen"
                component={TabListings}
                options={{ headerTitle: 'Listings Title' }}
            />
        </ListingsStack.Navigator>
    );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsScreen"
                component={TabSettings}
                options={{ headerTitle: 'Settings Title' }}
            />
        </SettingsStack.Navigator>
    );
}
