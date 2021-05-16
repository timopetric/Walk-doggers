import {Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import * as React from "react";
import {PRIMARY} from "../constants/Colors";
import AboutMeCard from "../components/AboutMeCard";
import { categories } from "../constants/Values";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 35,
      paddingTop: 15,
      paddingBottom: 50
    },
    image: {
        width: imgWidth,
        height: imgWidth/1.5,
        alignSelf: "center"
    },
    dogName: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "red-hat-text-500",
        paddingBottom: 10
    },

    description: {
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 16,
        fontFamily: "red-hat-text"
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    distance: {
        flex: 1
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        fontFamily: "red-hat-text-500"
    },
    miniImage: {
        width: imgWidth / 5,
        height: imgWidth / 5,
        borderRadius: imgWidth / 5,
    },
    aboutCard: {
        flexDirection: "row"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: PRIMARY,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: -25,
        width: 160,

      },
      appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "red-hat-text-500",
        alignSelf: "center"
      }
});


export default function DogScreen() {
    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1257560163-scaled-e1610062322469.jpg'}}
            />
            <View style={[{flex:1, alignItems: "flex-end", right: 25}]}> 
                <TouchableOpacity style={styles.appButtonContainer} activeOpacity={0.9}>
                    <Text style={styles.appButtonText}>I’m Interested</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.dogName}>Very Good Boy</Text>
                <Text style={styles.description}>I'm a very good boy. Just as my 6'1 owner. Please take me for a walk</Text>
                <Text style={styles.subtitle}>When</Text>
                <Text style={styles.description}>Tuesday 14:00 - 15:00</Text>
                <Text style={styles.subtitle}>Where</Text>
                <Text style={styles.description}>Ljubljana</Text>
                <Text style={styles.subtitle}>About Me</Text>

                    <AboutMeCard image={"https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1257560163-scaled-e1610062322469.jpg"} name={"bailey"} descr={"opis"} isDog={true} value={0} ></AboutMeCard>
                    
                <Text style={styles.subtitle}>About Owner</Text>
                   <AboutMeCard image={"https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg"} name={"bailey"} descr={"opis"} isDog={false} value={3} ></AboutMeCard>
            </View>
        </ScrollView>
    );
}
