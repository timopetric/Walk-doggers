import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import DogCard from "../components/DogCard";
import BlogCard from "../components/BlogCard";

export default function TabBlog() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <BlogCard title="The best dog food according to experts" date="TUESDAY 6.4.2020" modConfirmed={false}/>
        <BlogCard title="Elderly woman mauled to death by escaped dogs" date="TUESDAY 6.4.2020" modConfirmed={false}/>
        <BlogCard title="The best dog food according to experts" date="TUESDAY 6.4.2020" modConfirmed={false}/>
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
