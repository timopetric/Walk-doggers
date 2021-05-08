import React from "react";

import {Image, StyleSheet, View, Text, Dimensions} from "react-native";
import {GRAY_2} from '../constants/Colors';

import {Card, normalize} from "react-native-elements";
import Constants from "../constants/Colors"

interface IListingCardProps {
    status?: string;
    dogName?: string;
    descr?: string;
    date?: string;
    time?: string;
    numOfApplied?: string;
}

interface IListingCardState {
}

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width * 0.85;

class ListingCard extends React.Component<IListingCardProps, IListingCardState> {

    
    render() {
        return <Card containerStyle={{padding: 0}}>
            <Image
                style={styles.img}
                source={{uri: "https://www.cesarsway.com/wp-content/uploads/2019/10/AdobeStock_190562703.jpeg"}}
            />
            <View style={styles.listingCard}>
                <View style={styles.row}>
                    <Text style={{flex:1, fontFamily: "red-hat-text", fontSize: 12, fontStyle: "normal", fontWeight: "500", color: GRAY_2}}>ACCEPTED</Text>
                    <Text>lokacija</Text>
                </View>
                <Text>ime psa</Text>
                <Text>opis</Text>
                <Text>lokacija</Text>
            </View>

        </Card>
    }
}

export default ListingCard


const styles = StyleSheet.create({
    img: {
        width: imgWidth,
        height: imgWidth*0.8,
        padding: 0
    },
    dogName: {
        fontSize: 20
    },
    date: {

    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12
    },
    row: {
        flexDirection: "row",
        flex:1,
        justifyContent:"space-around"
        },
    distance: {
        flex: 1
    },
    takeMeWalk: {
        color: '#3789cc',
        textTransform: "uppercase",
        fontWeight: "bold",
        alignContent: "flex-end",
    },
    listingCard: {
        padding: 20
    }
});