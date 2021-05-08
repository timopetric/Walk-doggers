import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1
    },
    subtitle: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 10,
    },
    miniImage: {
        width: imgWidth / 5,
        height: imgWidth / 5,
        borderRadius: 10,
        marginHorizontal: 8,
    },
    addImage: {
        backgroundColor: GRAY_1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});


export default function NewBlogPostScreen() {
    return (
        <ScrollView>


            <View style={styles.container}>
                <Text style={styles.subtitle}>Title</Text>
                <Input></Input>
                <Text style={styles.subtitle}>Image</Text>
                <View style={styles.imageRow}>
                    <Image
                        style={styles.miniImage}
                        source={{uri: 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1257560163-scaled-e1610062322469.jpg'}}
                    />
                    <View style={[styles.miniImage, styles.addImage]}>
                        <Entypo size={imgWidth/10} name="plus" color={PRIMARY} />
                    </View>
                </View>
                <Text style={styles.subtitle}>Content</Text>
                <Input></Input>
            </View>
        </ScrollView>
    );
}
