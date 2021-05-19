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
import ImageUpload from "../../components/ImageUpload";
import CalendarDays from 'react-native-calendar-slider-carousel';
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";
import DogSelect from "../../components/DogSelect";

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

type Listing = {
    title: string;
    description: string;
    photos: Array<string>;
}

const initialListing: Listing = {
    title: "",
    description: "",
    photos: [],
}

export default function NewListingScreen({navigation}: any) {
    // const [listing, setListing] = useState<Listing>(initialListing);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [dogId, setDogId] = useState(null);

    return (
        <ScrollView style={{backgroundColor: "white"}}>
            <View style={styles.container}>
                <FormItem label={"TITLE"} placeholder={"Enter listing title"} getText={x => setTitle(x)}/>
                <FormItem label={"DOG"}>
                    <DogSelect onSelectId={setDogId} navigation={navigation}/>
                </FormItem>
                <FormItem label={"DESCRIPTION"} placeholder={"Describe your listing"} getText={x => setDescription(x)}
                          height={150}/>
                <FormItem label={"FROM"}>
                    <Text>ll</Text>
                </FormItem>

                <FormItem label={"TO"}>
                    <Text>ll</Text>
                </FormItem>

                <ButtonCustom text="Add" color={"purple"} onPress={() => onPressAdd(navigation)}/>
            </View>
        </ScrollView>
    );
}
