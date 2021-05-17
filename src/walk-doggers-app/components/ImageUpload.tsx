import {Button, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {GRAY_1, PRIMARY} from "../constants/Colors";
import {Entypo} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {decode as atob, encode as btoa} from 'base-64';
import mime from 'mime';

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    miniImage: {
        width: imgWidth / 5,
        height: imgWidth / 5,
        borderRadius: 10,
        marginHorizontal: 8,
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    addImage: {
        backgroundColor: GRAY_1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
})

export default function ImageUpload({saveUrl}: any) {
    const [imageUrls, setImageUrls] = useState([]);

    const imageComponents: Array<JSX.Element> = [];
    imageUrls.forEach((imageUrl: string, index: number) => {
        imageComponents.push(
            <Image
                style={styles.miniImage}
                source={{uri: imageUrl}}
                key={index}
            />
        );
    });

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    function DataURIToBlob(dataurl: any) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // base64: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            // @ts-ignore

            let formData = new FormData();

            if (Platform.OS === 'web') {
                const file = DataURIToBlob(result.uri);
                formData.append('image_data', file, 'image.jpg');
            } else {
                const newImageUri = "file:///" + result.uri.split("file:/").join("");
                formData.append('image_data', {
                    name: newImageUri.split("/").pop(),
                    type: mime.getType(newImageUri),
                    uri: newImageUri,
                });
            }

            console.log('env BASE_API_URL: ', process.env.BASE_API_URL);

            fetch(process.env.BASE_API_URL + '/image_upload/', {
                method: "POST",
                body: formData
            }).then(async response => {
                let json = await response.json();
                console.log(json);
                saveUrl(json.image_uri)
                // @ts-ignore
                setImageUrls(oldArray => [...oldArray, json.image_uri]);
                
            }).catch(e => {
                console.log(e);
            })
        }
    };

    return (
      <View style={styles.imageRow}>
        {imageComponents}
        <Pressable onPress={pickImage}>
          <View style={[styles.miniImage, styles.addImage]}>
            <Entypo size={imgWidth / 10} name="plus" color={PRIMARY} />
          </View>
        </Pressable>
      </View>
    );

}