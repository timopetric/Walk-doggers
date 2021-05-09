import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import MessageThread from '../components/MessageThread'
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from '../components/Carousel'

export default function TabInbox() {
  return (
      <ScrollView>
        {/*<Carousel data={[{title:"test", description:"test"}]}></Carousel>*/}
        <MessageThread name="Domen" lastMessage="To je moje sporocilo!"></MessageThread>
        <MessageThread name="Domen" lastMessage="To je moje sporocilo!"></MessageThread>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
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
