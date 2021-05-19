import {Button, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import {Card, Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import {useContext, useEffect, useState} from "react";
import {categories} from "../../constants/Values";
import * as ImagePicker from 'expo-image-picker';
import {decode as atob, encode as btoa} from 'base-64';
import mime from 'mime';
import ImageUpload from "../../components/ImageUpload";
import CalendarDays from 'react-native-calendar-slider-carousel';
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";
import DogSelect from "../../components/DogSelect";
import DateSelect from "../../components/DateSelect";
import * as Location from "expo-location";
import AuthContext from "../../navigation/AuthContext";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        // margin: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1
    },
    innerContainer: {
        marginTop: 20,
        width: 800,
        maxWidth: "100%",
        flex: 1
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


type Listing = {
    title: string;
    description: string;
    photos: Array<string>;
}

const addListing = (navigation: any, listing: Listing, getJwt: any) => {
    let jwt = getJwt()
    console.log("JWT " + jwt);
    fetch(process.env.BASE_API_URL + '/listings/', {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(listing)
    }).then(async response => {
        let json = await response.json();
        console.log(json)
        const statusCode = response.status;
        switch (statusCode) {
            case 201:
                navigation.goBack();
                break;
            default:
                alert("error");
                // TODO: notify user about error
                break;
        }
    }).catch(e => {
        console.log(e);
    })
}
export default function NewListingScreen({navigation}: any) {
    // const [listing, setListing] = useState<Listing>(initialListing);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [dogId, setDogId] = useState(null);
    const [location, setLocation] = useState({});

    const {getJwt} = useContext(AuthContext);

    const onPressAdd = () => {
        const listing = {
            title,
            description,
            date_from: dateFrom,
            date_to: dateTo,
            dog_id: dogId,
            lat: location?.coords?.latitude,
            lon: location?.coords?.longitude,
        }
        console.log(listing)
        addListing(navigation, listing, getJwt);
    }

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <View style={styles.innerContainer}>
                <FormItem label={"TITLE"} placeholder={"Enter listing title"} getText={x => setTitle(x)}/>
                <FormItem label={"DOG"}>
                    <DogSelect onSelectId={setDogId} navigation={navigation}/>
                </FormItem>
                <FormItem label={"DESCRIPTION"} placeholder={"Describe your listing"} getText={x => setDescription(x)}
                          height={150}/>
                <FormItem label={"FROM"}>
                    <DateSelect onDateTimeSelect={setDateFrom}/>
                </FormItem>

                <FormItem label={"TO"}>
                    <DateSelect onDateTimeSelect={setDateTo}/>
                </FormItem>

                <ButtonCustom text="Publish" color={"purple"} onPress={() => onPressAdd(navigation)}/>
            </View>
        </ScrollView>
    );
}
