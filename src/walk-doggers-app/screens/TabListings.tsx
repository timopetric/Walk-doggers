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
        <ListingCard status="" dogName="" descr="" date="" time="" numOfApplied=""/>
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
