import {Button, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import {Card, Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {categories} from "../../constants/Values";
import * as ImagePicker from 'expo-image-picker';

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
    touchable: {

    },
    text: {

    },
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

function onPressAdd(navigation : any) {
    navigation.goBack();
}

const image_urls: Array<string> = [];
const images: Array<any> = [];
const image_components: Array<JSX.Element> = [];

image_urls.forEach((image_url: string, index: number) => {
    image_components.push(
        <Image
            style={styles.miniImage}
            source={{uri: image_url}}
        />
    );
});

export default function NewDogScreen({navigation} : any) {
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            // @ts-ignore
            setImage(result.uri);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Dog's name</Text>
                <Input></Input>

                <Text style={styles.subtitle}>Description</Text>
                <Input></Input>

                <Text style={styles.subtitle}>Size</Text>
                <SizePicker/>


                <Text style={styles.subtitle}>Image</Text>
                <View style={styles.imageRow}>
                    {image && <Image source={{ uri: image }} style={styles.miniImage} />}
                    <Pressable onPress={pickImage}>
                        <View style={[styles.miniImage, styles.addImage]}>
                            <Entypo size={imgWidth/10} name="plus" color={PRIMARY} />
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.subtitle}>Content</Text>
                <Input></Input>

                <Button title="Add" color={GRAY_3} onPress={() => onPressAdd(navigation)}/>
            </View>
        </ScrollView>
    );
}

function SizePicker() {
    const [selected, setSelected] = useState(0);

    let sizePickerItems : any = [];
    categories.forEach((category, index, arr) => {
        sizePickerItems.push(
            <SizePickerBox category={category} selected = {selected} key={index} index={index} setSelected={setSelected}/>
        )
    })

    return <View style={styles.sizesRow}>{sizePickerItems}</View>

}

function SizePickerBox(props: any) {
    return (
        <Pressable style={styles.touchable} onPress={() => props.setSelected(props.index) }>
            <Card containerStyle={[styles.sizePickerBox, props.selected == props.index ? styles.selected : styles.notSelected]}>
                <Text style={styles.text}>{props.category}</Text>
                <Text style={styles.text}>kg</Text>
            </Card>
        </Pressable>
    )
}
