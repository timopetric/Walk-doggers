import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ListingCard from "../../components/ListingCard"
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useIsFocused} from "@react-navigation/native";
import AuthContext from "../../navigation/AuthContext";
import {useEffect, useState, useContext} from "react";
import {format} from "date-fns";




function MyListings() {
  const isFocused = useIsFocused();
  const { getJwt } = useContext(AuthContext);
  const [ myListings, setMyListings ] = useState([])

  useEffect(() => {
    if (isFocused) {
      getMyListings();
    }
  }, [isFocused]);

  const getMyListings = () => {
    fetch(process.env.BASE_API_URL + "/listings/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
    }).then(async (response) => {
      let json = await response.json();
      console.log(json);
      setMyListings(json);
    });
  };

  function renderItem ({item}) {

    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date_from = new Date(item.date_from.toString());
    const date_to = new Date(item.date_to.toString());
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    //@ts-ignore
    const date_item = date_from.toLocaleDateString('de-DE', options);
    const hours = `${format(date_from, 'HH:mm')} - ${format(date_to, 'HH:mm')}`
    return (
      <ListingCard
        status="accepted"
        location={item.location_text}
        dogName={item.title}
        descr={item.description}
        date={date_item}
        dateDay={daysOfWeek[date_from.getDay()]}
        time={hours}
        numOfApplied={item.applications.length}
      />
    );
}

  return (
    <View style={styles.container}>
      <FlatList
        data={myListings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

function Applied() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ListingCard status="accepted" location="Ljubljana, Slovenija" dogName="Bad Guy" descr="Whoever is righteous has regard for the life of his beast, but the mercy of the wicked is cruel. - Proverbs 12:10" date="10.5.2020" dateDay = "Thursday" time="14:00" numOfApplied="6"/>
      </ScrollView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabListings() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="MY LISTINGS" component={MyListings} />
        <Tab.Screen name="APPLIED" component={Applied} />
      </Tab.Navigator>
    </NavigationContainer>
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
