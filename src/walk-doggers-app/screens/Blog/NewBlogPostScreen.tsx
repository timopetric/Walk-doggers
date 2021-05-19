import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../../constants/Colors";
import {Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ImageUpload from "../../components/ImageUpload";
import {useContext, useEffect} from "react";
import AuthContext from "../../navigation/AuthContext";
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";


const saveUrl = (url: string) => {
    //todo
}

export default function NewBlogPostScreen({navigation}: any) {
    const {isReporter, getRoles} = useContext(AuthContext);


    useEffect(() => {
        getRoles().then(() => {
            if (!isReporter()) {
                alert('Restricted to reporters.')
                navigation.goBack();
            }
        })
    }, [])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <View style={styles.innerContainer}>
                <FormItem label={"TITLE"} placeholder={"Blog post title"}/>
                <FormItem label={"IMAGE"}>
                    <ImageUpload saveUrl={saveUrl} maxImages={10} showEdit={true}/>
                </FormItem>
                <FormItem label={"CONTENT"} placeholder={"Blog content"}
                          height={150}/>
                <ButtonCustom text="Create Blog Post" color={"purple"}/>
            </View>
        </ScrollView>
    );
}

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
        width: 500,
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
    }
});
