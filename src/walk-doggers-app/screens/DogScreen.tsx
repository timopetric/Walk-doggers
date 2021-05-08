import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE} from "../constants/Colors";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    image: {
        width: imgWidth,
        height: imgWidth,
        alignSelf: "center"
    },
    dogName: {
        fontSize: 24,
        fontWeight: "bold",
    },
    date: {

    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14
    },
    row: {
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
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    }
});


export default function DogScreen() {
    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1257560163-scaled-e1610062322469.jpg'}}
            />

            <View style={styles.container}>
                <Text style={styles.dogName}>Very Good Boy</Text>
                <Text style={styles.description}>I'm a very good boy. Just as my 6'1 owner. \n Please take me for a walk</Text>
                <Text style={styles.subtitle}>When</Text>
                <Text>Tuesday 14:00 - 15:00</Text>
                <Text style={styles.subtitle}>Where</Text>
                <Text>Ljubljana</Text>
                <Text style={styles.subtitle}>About Me</Text>
            </View>
        </ScrollView>
    );
}
