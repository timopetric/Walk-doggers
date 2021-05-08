import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListingCard from "../components/ListingCard"

export default function TabListings() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ListingCard status="accepted" location="Ljubljana, Slovenija" dogName="Bad Guy" descr="Whoever is righteous has regard for the life of his beast, but the mercy of the wicked is cruel. - Proverbs 12:10" date="10.5.2020" dateDay = "Thursday" time="14:00" numOfApplied="6"/>
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
