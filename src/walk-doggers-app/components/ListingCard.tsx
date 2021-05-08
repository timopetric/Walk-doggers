import React from "react";

import {Image, StyleSheet, View, Text, Dimensions} from "react-native";
import {GRAY_2} from '../constants/Colors';

import {Card, normalize} from "react-native-elements";
import Constants from "../constants/Colors"

interface IListingCardProps {
    status?: string;
    location?: string;
    dogName?: string;
    descr?: string;
    dateDay?: string;
    date?: string;
    time?: string;
    numOfApplied?: string;
}

interface IListingCardState {
}

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;

class ListingCard extends React.Component<IListingCardProps, IListingCardState> {

    
    render() {
        return <Card containerStyle={{padding: 0}}>
            <Image
                style={styles.img}
                source={{uri: "https://www.cesarsway.com/wp-content/uploads/2019/10/AdobeStock_190562703.jpeg"}}
            />
            <View style={styles.listingCard}>
                <View style={styles.row}>
                    <Text style={styles.status}>ACCEPTED</Text>
                    <Text style={styles.location}>{this.props.location}</Text>
                </View>
                <Text style={styles.dogName}>{this.props.dogName}</Text>
                <Text style={styles.description}>{this.props.descr}</Text>
                <View style={styles.row}>
                    <View style={styles.dateRow}>
                        <Text style={styles.dateDay}>{this.props.dateDay}</Text>
                        <Text style={styles.date}>{this.props.date}</Text>
                    </View>
                    <Text style={styles.time}>{this.props.time}</Text>
                </View>
                
            </View>

        </Card>
    }
}

export default ListingCard


const styles = StyleSheet.create({
    img: {
        flex: 1,
        height: imgWidth*0.8,
        padding: 0
    },
    status: {
        flex:1, 
        fontFamily: "red-hat-text", 
        fontSize: 12, 
        fontStyle: "normal", 
        color: GRAY_2
    },
    location: {
        fontFamily: "red-hat-text",
        fontSize: 14
    },
    dogName: {
        fontFamily: "red-hat-text-500",
        fontWeight: "500",
        fontSize: 28,
        marginTop: 10
    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        fontFamily: "red-hat-text"
    },
    row: {
        flexDirection: "row",
        flex:1,
        justifyContent:"space-around",
        alignItems: "center"
    },
    listingCard: {
        padding: 20
    },
    dateDay: {
        fontFamily: "red-hat-text-500",
        fontSize: 16,
        textTransform: "uppercase"
    },
    date: {
        fontFamily: "red-hat-text",
        fontSize: 16,
        marginLeft: 10
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flex: 1
    },
    time: {
        fontFamily: "red-hat-text-500",
        fontSize: 16,
    }

});