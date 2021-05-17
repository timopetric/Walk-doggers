import {Button, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import {Card, Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {categories} from "../../constants/Values";
import * as ImagePicker from 'expo-image-picker';
import {decode as atob, encode as btoa} from 'base-64';
import mime from 'mime';

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
    },
    selected: {
        backgroundColor: '#747575'
    },
    notSelected: {
        backgroundColor: '#e1e3e6'
    },
    touchable: {},
    text: {},
    sizesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    sizePickerBox: {
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 5,
    },
});

function onPressAdd(navigation: any) {
    navigation.goBack();
}

export default function NewListingScreen({navigation}: any) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Title</Text>
                <Input></Input>

                <Text style={styles.subtitle}>Dog</Text>

                <Text style={styles.subtitle}>Images</Text>
                <View style={styles.imageRow}>
                    <Pressable>
                        <Image
                            style={styles.miniImage}
                            source={{uri: 'https://i.ebayimg.com/images/g/W9gAAOSwf05bGvqH/s-l400.jpg'}}
                        />
                        <View style={[styles.miniImage, styles.addImage]}>
                            <Entypo size={imgWidth / 10} name="plus" color={PRIMARY}/>
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.subtitle}>Description</Text>
                <Input></Input>

                <Button title="Add" color={GRAY_3} onPress={() => onPressAdd(navigation)}/>
            </View>
        </ScrollView>
    );
}