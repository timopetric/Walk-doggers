
import * as React from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Colors, { PRIMARY, PINKISH_WHITE} from '../constants/Colors';
import CarouselCards from '../components/CarouselCards'

export default function MessagesScreen() {
    return (
        <View style={[{flexDirection: "column"}]}>
            <View style={styles.container1}>
                <Image source={{uri: 'https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg'}} style={styles.miniImage}></Image>
                <Text style={styles.name}>Saša Petrovič</Text>
            </View>
            <View style={styles.container2}>
            <CarouselCards></CarouselCards>
            </View>
        </View>
    
    )
}

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    miniImage: {
        width: imgWidth / 5,
        height: imgWidth / 5,
        borderRadius: imgWidth / 5,
        marginHorizontal: 8,
        alignSelf: "center",
        marginTop: 20
    },
    name: {
        alignSelf: "center",
        fontFamily: "roboto-500",
        color: PINKISH_WHITE,
        fontSize: 20,
        marginBottom: 50
    },
    container1: {
        backgroundColor: PRIMARY,
    },
    container2: {
        height: '100%',
        borderRadius:55,
        marginTop: -40,
        backgroundColor: "white"
        
    }
});