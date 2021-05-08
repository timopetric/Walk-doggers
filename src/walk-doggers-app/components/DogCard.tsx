import React from "react";

import {Image, StyleSheet, View, Text, Dimensions, Pressable} from "react-native";
import {Card} from "react-native-elements";
import {BLUE} from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

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
    dogCard: {
        width: imgWidth,
        height: imgWidth,
        alignSelf: "center"
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
    }
});

class DogCard extends React.Component<IDogCardProps, IDogCardState> {
    render() {

        return <Card>
            <Image
                style={styles.dogCard}
                source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'}}
            />
            <Text style={styles.date}>{this.props.date}</Text>
            <Text style={styles.dogName}>{this.props.name}</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <View style={styles.imageRow}>
                <Text style={styles.distance}>{this.props.distance}</Text>
                <Text style={styles.takeMeWalk}>Take me for a walk</Text>
            </View>
        </Card>
    }
}

export default DogCard;
