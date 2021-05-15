import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import * as React from "react";
import {BLUE} from "../constants/Colors";
import AboutMeCard from "../components/AboutMeCard";
import { categories } from "../constants/Values";

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
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    miniImage: {
        width: imgWidth / 5,
        height: imgWidth / 5,
        borderRadius: imgWidth / 5,
    },
    aboutCard: {
        flexDirection: "row"
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
                <Text style={styles.description}>I'm a very good boy. Just as my 6'1 owner. Please take me for a walk</Text>
                <Text style={styles.subtitle}>When</Text>
                <Text>Tuesday 14:00 - 15:00</Text>
                <Text style={styles.subtitle}>Where</Text>
                <Text>Ljubljana</Text>
                <Text style={styles.subtitle}>About Me</Text>

                    <AboutMeCard image={"https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1257560163-scaled-e1610062322469.jpg"} name={"bailey"} descr={"opis"} isDog={true} value={0} ></AboutMeCard>

                <Text style={styles.subtitle}>About Owner</Text>
                <View style={styles.aboutCard}>
                    <Image
                        style={styles.miniImage}
                        source={{uri: 'https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg'}}
                    />
                    <Text style={{marginLeft: 20}}>Saša Petrović</Text>
                </View>
            </View>
        </ScrollView>
    );
}
