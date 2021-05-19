import {Button, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import {Card, Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import {useEffect, useState, useContext} from "react";
import {categories} from "../../constants/Values";
import * as ImagePicker from 'expo-image-picker';
import {decode as atob, encode as btoa} from 'base-64';
import mime from 'mime';
import AuthContext from "../../navigation/AuthContext";
import ImageUpload from "../../components/ImageUpload";
import SizeSelector from "../../components/SizeSelector";
import FormItem from "../../components/FormItem";
import DateSelect from "../../components/DateSelect";
import ButtonCustom from "../../components/ButtonCustom";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white",
        flex: 1
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

function onPressAdd(navigation: any, dog: Dog, getJwt: any) {
    let jwt = getJwt()

    let reqBody: any = {}
    if (dog.name !== "") reqBody.name = dog.name;
    // TODO: make name field a required field, present an error if its empty
    if (dog.description !== "") reqBody.description = dog.description;
    if (dog.size_category !== -1) reqBody.size_category = dog.size_category;
    if (dog.photo !== "") reqBody.photo = dog.photo;

    // console.log(JSON.stringify(reqBody))
    // console.log('env BASE_API_URL: ', process.env.BASE_API_URL);
    // console.log(JSON.stringify(dog))

    fetch(process.env.BASE_API_URL + '/dogs/', {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(reqBody)
    }).then(async response => {
        let json = await response.json();
        console.log(json)
        const statusCode = response.status;
        switch (statusCode) {
            case 201:
                // successfully created dog
                navigation.goBack();
                break;
            case 422:
                // TODO: notify user about validation error
                // description missing, ...
                break;

            default:
                // TODO: notify user about error
                break;
        }
    }).catch(e => {
        console.log(e);
    })
}

type Dog = {
    name: string;
    description: string;
    size_category: number;
    photo: string;
}


export default function NewDogScreen({navigation}: any) {
    const {getJwt} = useContext(AuthContext);

    const [dog, setDog] = useState<Dog>({
        name: "",
        description: "",
        size_category: 0,
        photo: "",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setDog({...dog, size_category: selectedIndex})
    }, [selectedIndex]);

    const saveUrl = (url: string) => {
        setDog({...dog, photo: url})
        console.log(url)
    }

    return (
        <ScrollView style={styles.container}>
            <FormItem label={"NAME"} placeholder={"Enter dog's name"}
                      getText={(text) => setDog({...dog, name: text})}/>
            <FormItem label={"DESCRIPTION"} placeholder={"Describe your dog"}
                      getText={(text) => setDog({...dog, description: text})}
                      height={150}/>
            <FormItem label={"SIZE"}>
                <SizeSelector categories={categories} selectedIndex={selectedIndex}
                              setSelectedIndex={setSelectedIndex} multiple={false}/>
            </FormItem>
            <FormItem label={"IMAGE"}>
                <ImageUpload saveUrl={saveUrl} maxImages={10} showEdit={true}/>
            </FormItem>
            <ButtonCustom text="Add" color={"purple"} onPress={() => onPressAdd(navigation, dog, getJwt)}/>
        </ScrollView>
    );
}
