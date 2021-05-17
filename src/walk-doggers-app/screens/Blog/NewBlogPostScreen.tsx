import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ImageUpload from "../../components/ImageUpload";
import { useState } from "react";
import FormTextInput from "../../components/FormInput";

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
    input:{
        borderRadius: 10,
        backgroundColor: "rgba(205, 205, 205, 1)"
    }
});

const saveUrl = (url: string) => {
    //todo
}

export default function NewBlogPostScreen() {
    const [title, setTitle] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<string>("")
    const [desc, setDesc] = useState<string>("");

    console.log(title, desc);
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Title</Text>
                <TextInput 
                    onChangeText={(text:string) => setTitle(text)}
                    value={title}
                    style={styles.input}
                />

                <Text style={styles.subtitle}>Image</Text>
                <ImageUpload saveUrl={saveUrl} maxImages={1}/>
                <Text style={styles.subtitle}>Content</Text>
                <MultiLineTextInput
                    multiline
                    numberOfLines={5}
                    onChangeText={(text:string) => setDesc(text)}
                    value={desc}
                    backgroundColor="rgba(205, 205, 205,1)"
                    style={styles.input}
                />
            </View>
        </ScrollView>
    );
}
