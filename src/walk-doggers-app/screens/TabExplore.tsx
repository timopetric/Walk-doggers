import * as React from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Card from "../components/Card";
import {View, Text} from "react-native";
import ExploreFilter from "../components/ExploreFilter";

import {Provider} from "react-redux";
import {store, toggleFilter} from "../redux/store";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';

const imageUrl = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod empor incididunt ut labore et dolore magna aliqua.'
function onPress(props: any, navigation: any){
    navigation.navigate('DogScreen');
}


export default function TabExplore({navigation}: any) {
    const categories = [
        "1-5",
        "5-10",
        "10-20",
        "20-40",
        "40+",
    ]

    const [distance, setDistance] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState(new Set([0]));

    // useEffect(() => {
    // make api request for listings
    // }, [distance, selectedIndexes])

    const [location, setLocation] = useState({}) ;
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      console.log(text)
    }

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <ExploreFilter distance={distance} setDistance={setDistance} selectedIndexes={selectedIndexes}
                               setSelectedIndexes={setSelectedIndexes} multiple={true} categories={categories}/>
            </Provider>

            <ScrollView>
                <Card
                    content={content}
                    callToActionText={'Take me for a walk'}
                    imageUrl={imageUrl}
                    title="Smol Husky Woofer"
                    date=" 6.4.2020"
                    day="TUESDAY"
                    distance="1.8 km"
                    time="7:00 - 21:00"
                    onPress={onPress}
                />
                <Card
                    content={content}
                    callToActionText={'Take me for a walk'}
                    imageUrl={imageUrl}
                    title="Very Good Boy"
                    date=" 6.4.2020"
                    day="TUESDAY"
                    distance="1.8 km"
                    time="7:00 - 21:00"
                    onPress={onPress}
                />
                <Card
                    content={content}
                    callToActionText={'Take me for a walk'}
                    imageUrl={imageUrl}
                    title="Snoop Dog"
                    date=" 6.4.2020"
                    day="TUESDAY"
                    distance="1.8 km"
                    time="7:00 - 21:00"
                    onPress={onPress}
                />
            </ScrollView>
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
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
