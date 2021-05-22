import {
    Button,
    Dimensions,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../constants/Colors";
import {Entypo} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {decode as atob, encode as btoa} from 'base-64';
import mime from 'mime';
import {BASE_API_URL} from "../localConstants";

const styles = StyleSheet.create({
    miniImage: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
    imageRow: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        margin: 4,
        // shadowRadius: 6,
        // shadowOffset: {
        //     height: 2,
        //     width: 2,
        // },
        // shadowOpacity: 0.1,
        // elevation: 2,
        overflow: "hidden",
    },
    addImage: {
        backgroundColor: GRAY_0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
})

function ImageUploadButton({imageUrls, maxImages, pickImage}: any) {
    if (imageUrls.length < maxImages) {
        return (
            <Pressable onPress={pickImage}>
                <View style={[styles.miniImage, styles.addImage]}>
                    <Entypo size={28} name="plus" color={GRAY_3}/>
                </View>
            </Pressable>
        )
    } else {
        return (
            <View/>
        )
    }
}

export default function ImageUpload({saveUrl, defaultUrl, circle, size, showEdit}: any) {
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

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

    useEffect(() => {
        console.log("defaulturl: " + defaultUrl);
        if (defaultUrl !== undefined) {
            setImageUrl(defaultUrl);
        }
    },[defaultUrl]);

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

    function makeID(length: number) {
        let result = [];
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
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
                formData.append('image_data', file, makeID(10));
            } else {
                const newImageUri = "file:///" + result.uri.split("file:/").join("");
                formData.append('image_data', {
                    name: newImageUri.split("/").pop(),
                    // @ts-ignore
                    type: mime.getType(newImageUri),
                    uri: newImageUri,
                });
            }

            console.log('env BASE_API_URL: ', BASE_API_URL);

            fetch(BASE_API_URL + '/image_upload/', {
                method: "POST",
                body: formData
            }).then(async response => {
                let json = await response.json();
                console.log(json);
                saveUrl(json.image_uri)
                // @ts-ignore
                setImageUrl(json.image_uri)
                // setImageUrls(oldArray => [...oldArray, json.image_uri]);

            }).catch(e => {
                console.log(e);
            })
        }
    };

    return (
        <View style={styles.imageRow}>
            {/*{imageComponents}*/}
            <TouchableOpacity onPress={pickImage}
                              style={{
                                  height: size !== undefined ? size : 80,
                                  width: size !== undefined ? size : 80,
                                  borderRadius: circle === true ? 150 : 4,
                                  overflow: "hidden",
                                  // margin: 4
                              }}>
                {imageUrl !== null ?
                    <Image
                        style={styles.miniImage}
                        source={{uri: imageUrl}}
                    />
                    :
                    <View style={[styles.miniImage, styles.addImage]}>
                        <Entypo size={28} name="plus" color={GRAY_3}/>
                    </View>
                }
            </TouchableOpacity>
            {showEdit === true && imageUrl !== null &&
            <View
                pointerEvents={"none"}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    borderRadius: circle === true ? 120 : 4,
                    height: size !== undefined ? size : 80,
                    width: size !== undefined ? size : 80,
                    flexDirection: 'column-reverse',
                    overflow: 'hidden',
                    alignItems: 'center'
                }}>
                <View style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    width: size !== undefined ? size : 80,
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "white",
                        paddingBottom: 4,
                        paddingTop: 2,
                        fontSize: 12,
                        fontWeight: "500"
                    }}>Edit</Text>
                </View>
            </View>
            }


            {/*<ImageUploadButton*/}
            {/*    imageUrls={imageUrls}*/}
            {/*    maxImages={maxImages}*/}
            {/*    pickImage={pickImage}*/}
            {/*/>*/}


        </View>
    );

}
