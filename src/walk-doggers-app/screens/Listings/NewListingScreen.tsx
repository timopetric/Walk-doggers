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
    const [listing, setListing] = useState<Listing>(initialListing);
    const [date, setDate] = useState({})

    const saveUrl = (url: string) => {
        setListing({...listing, photos: [...(listing.photos), url]});
        console.log(url);
    }
    const changeSelectedDate = (date) => {
        console.log(date); // "2019-07-20"
        
        setDate({
          date
         });
      };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Title</Text>
                <Input></Input>

                <Text style={styles.subtitle}>Dog</Text>

                <Text style={styles.subtitle}>Images</Text>
                <CalendarDays
                // First day. Default = new Date()
                firstDate={"2019-07-05"}
                // Last day. You can set number of days instead
                lastDate={"2019-07-20"}
                // Sets number of days displaued. Default = 30
                numberOfDays={60}
                // Initial selected day. Default = firstDate
                selectedDate={"2019-07-10"}
                // scrollView width
                width={dimensions.width}
                // Instead of width you can set number of days visible.
                daysInView={3}
                // Only available if width % 120 = 0. Scroll by full width
                paginate={true}
                // Function to get selected date in 'YYYY-MM-DD' format
                onDateSelect={date => changeSelectedDate(date)}
                // Replaces scroll with left and right arrows.
                // Suitable for web where horizontal scroll is not always available 
                arrows={false}

                />
                <ImageUpload saveUrl={saveUrl} maxImages={3}/>
                <Text style={styles.subtitle}>Description</Text>
                <Input></Input>

                <Button title="Add" color={GRAY_3} onPress={() => onPressAdd(navigation)}/>
            </View>
        </ScrollView>
    );
}
