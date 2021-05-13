import React from "react";

import {Image, StyleSheet, View, Text, Dimensions, Pressable, TouchableHighlight, TouchableOpacity} from "react-native";
import {Card} from "react-native-elements";
import {BLUE, GRAY_3, GRAY_0, GRAY_1, GRAY_2} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';

interface IDogCardProps {
    name?: string;
    date?: string;
    distance?: string;
}

interface IDogCardState {
}

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width * 0.85;
const styles = StyleSheet.create({

    dogName: {
        fontSize: 23,
        fontWeight: "500",
        marginTop: 6
    },
    date: {
        color: GRAY_1,
        fontWeight:"500"
    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1
    },
    takeMeWalk: {
        color: BLUE,
        textTransform: "uppercase",
        fontWeight: "bold",
        alignContent: "flex-end",
    },
    card: {
        backgroundColor: "#fff",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 1,
        flex: 1,
        // padding: 10,
        margin: 10,
        borderRadius: 12,
    },
    image: {
        width: "100%",
        aspectRatio: 4/3,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12
        // flex:1,
        // alignSelf: "center"
    },
});

const DogCard = props => {

    const {date, name, distance, imageUrl, onPress} = props;
    return <View style={styles.card}>
        <Image
            style={styles.image}
            source={{uri: imageUrl}}
        />
        <View style={{padding: 16}}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.dogName}>{name}</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor
                incididunt ut labore et dolore magna aliqua.</Text>
            <View style={styles.imageRow}>
                <Text style={styles.distance}>{distance}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.takeMeWalk}>Take me for a walk</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

export default DogCard;
