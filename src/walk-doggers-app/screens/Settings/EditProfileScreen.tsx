import {Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../../constants/Colors";
import {Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ButtonCustom from "../../components/ButtonCustom"
import ImageUpload from "../../components/ImageUpload";
import FormItem from "../../components/FormItem";
import {useState} from "react";


function onPressSaveChanges(navigation: any) {
    navigation.goBack()
}

export default function EditProfileScreen({navigation}: any) {

    const [imageUrl, setImageUrl] = useState('https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg')

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <View style={styles.innerContainer}>

                <View style={{alignItems: "center", justifyContent: "center", height: 150}}>
                    <ImageUpload circle={true} size={100} showEdit={true}
                                 defaultUrl={imageUrl} saveUrl={setImageUrl}/>
                </View>
                <FormItem label={"FIRST NAME"} placeholder={"Enter your first name"}/>
                <FormItem label={"LAST NAME"} placeholder={"Enter your last name"}/>
                <FormItem label={"EMAIL"}/>
                <FormItem label={"ABOUT ME"} placeholder={"Describe yourself"} height={120}/>
                <ButtonCustom text='Save changes' onPress={() => onPressSaveChanges(navigation)} color="purple"
                              style={{marginBottom: 20}}/>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        // margin: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1
    },
    innerContainer: {
        width: 500,
        maxWidth: "100%",
        flex: 1
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    subtitle: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 10,
    },
});
