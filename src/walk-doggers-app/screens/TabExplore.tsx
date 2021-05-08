import * as React from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import DogCard from "../components/DogCard";
import {View, Text} from "react-native";
import ExploreFilter from "../components/ExploreFilter";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from "react-redux";
import {store, toggleFilter} from "../redux/store";

export default function TabExplore({navigation} : any) {

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <ExploreFilter/>
      </Provider>
      <ScrollView>
        <Pressable onPress={() => navigation.navigate('DogScreen')}><DogCard name="Smol Husky Woofer" date="TUESDAY 6.4.2020" distance="1.8km"/></Pressable>

        <DogCard name="Very Good Boy" date="TUESDAY 6.4.2020" distance="1.8km"/>
        <DogCard name="Snoop Dog" date="TUESDAY 6.4.2020" distance="1.8km"/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
