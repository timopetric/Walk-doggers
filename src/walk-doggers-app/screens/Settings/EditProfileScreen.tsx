import {Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import ButtonCustom from "../../components/ButtonCustom"
import ImageUpload from "../../components/ImageUpload";
import FormItem from "../../components/FormItem";
import {useState} from "react";
import ScrollViewContainer from "../../components/ScrollViewContainer";


function onPressSaveChanges(navigation: any) {
    navigation.goBack()
}

export default function EditProfileScreen({navigation}: any) {

    const [imageUrl, setImageUrl] = useState('https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg')

    return (
        <ScrollViewContainer>
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
        </ScrollViewContainer>

    );
}
