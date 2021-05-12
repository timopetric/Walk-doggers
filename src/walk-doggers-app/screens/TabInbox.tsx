import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import MessageThread from '../components/MessageThread'
import { Text, View } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import CarouselCards from '../components/CarouselCards'

export default function TabInbox({navigation} : any) {
  const onPress = () => {navigation.navigate('MessageScreen')};
  return (
      <ScrollView>
        <CarouselCards></CarouselCards>
        <MessageThread name="Domen" lastMessage="To je moje sporocilo!" onPress = {onPress}></MessageThread>
        <MessageThread name="Domen" lastMessage="To je moje sporocilo!" onPress = {onPress}></MessageThread>
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
