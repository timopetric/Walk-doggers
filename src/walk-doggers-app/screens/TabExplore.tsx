import * as React from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Card from "../components/Card";
import {View, Text} from "react-native";
import ExploreFilter from "../components/ExploreFilter";

import {Provider} from "react-redux";
import {store, toggleFilter} from "../redux/store";
import {useEffect, useState} from "react";

const imageUrl = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod empor incididunt ut labore et dolore magna aliqua.'

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

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <ExploreFilter distance={distance} setDistance={setDistance} selectedIndexes={selectedIndexes}
                               setSelectedIndexes={setSelectedIndexes} multiple={true} categories={categories}/>
            </Provider>

            <ScrollView>
                <Card content={content} callToActionText={'Take me for a walk'} imageUrl={imageUrl} title="Smol Husky Woofer" date="TUESDAY 6.4.2020" distance="1.8 km"
                      onPress={() => navigation.navigate('DogScreen')}/>
                <Card content={content} callToActionText={'Take me for a walk'} imageUrl={imageUrl} title="Very Good Boy" date="TUESDAY 6.4.2020" distance="1.8 km"/>
                <Card content={content} callToActionText={'Take me for a walk'} imageUrl={imageUrl} title="Snoop Dog" date="TUESDAY 6.4.2020" distance="1.8 km"/>
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
