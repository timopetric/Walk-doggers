import * as React from 'react';
import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import MessageThread from '../components/MessageThread'
import {Text, View} from 'react-native';
import {ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import CarouselCards from '../components/CarouselCards'

export default function TabInbox({navigation}: any) {
    const onPress = () => {
        navigation.navigate('MessageScreen')
    };
    return (
        <ScrollView style={styles.containter}>
            <CarouselCards inChat={false}/>
            <View style={{height: 10}}/>
            <MessageThread name="Domen" lastMessage="To je moje sporocilodfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"
                           onPress={onPress}/>
            <MessageThread name="Domen" lastMessage="To je moje sporocilo!" onPress={onPress}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containter: {
        backgroundColor: "white",
        flex: 1
    }
});
