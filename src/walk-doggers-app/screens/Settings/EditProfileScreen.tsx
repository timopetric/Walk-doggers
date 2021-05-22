import {Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import ButtonCustom from "../../components/ButtonCustom"
import ImageUpload from "../../components/ImageUpload";
import FormItem from "../../components/FormItem";
import {useState, useEffect, useContext} from "react";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import {useIsFocused} from "@react-navigation/native";
import AuthContext from "../../navigation/AuthContext";
import {BASE_API_URL} from "../../localConstants";


type User = {
    first_name: string;
    last_name: string;
    description: string;
    image_url: string | undefined;
}


const updateUserProfile = (getJwt: any, user: User) => {
    let jwt = getJwt()
    fetch(BASE_API_URL + '/profile', {
        method: "PUT",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(user)
    })
}

export default function EditProfileScreen({navigation}: any) {
    const isFocused = useIsFocused();
    const {getJwt} = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState()
    const [fstName, setFstName] = useState("")
    const [lstName, setLstName] = useState("")
    const [email, setEmail] = useState("")
    const [about, setAbout] = useState("")

    useEffect(() => {
        if (isFocused) {
            fetch(BASE_API_URL + '/profile', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getJwt()
                },
            }).then(async response => {
                let json = await response.json();
                console.log(json)
                setFstName(json.first_name)
                setLstName(json.last_name)
                setAbout(json.description)
                setEmail(json.email)
                setImageUrl(json.image_url)
            })
        }
    }, [isFocused])

    const onPressUpdate = () => {
        const user = {
            first_name: fstName,
            last_name: lstName,
            description: about,
            image_url: imageUrl
        }
        updateUserProfile(getJwt, user);
        navigation.goBack()
    }


    return (
        <ScrollViewContainer>
            <View style={{alignItems: "center", justifyContent: "center", height: 150}}>
                <ImageUpload circle={true} size={100} showEdit={true}
                             defaultUrl={imageUrl} saveUrl={setImageUrl} url={imageUrl}/>
            </View>
            <FormItem label={"FIRST NAME"} placeholder={"Enter your first name"} setText={fstName}
                      getText={x => setFstName(x)}/>
            <FormItem label={"LAST NAME"} placeholder={"Enter your last name"} setText={lstName}
                      getText={x => setLstName(x)}/>
            <FormItem label={"EMAIL"} setText={email} editable={false}/>
            <FormItem label={"ABOUT ME"} placeholder={"Describe yourself"} height={120} setText={about}
                      getText={x => setAbout(x)}/>
            <ButtonCustom text='Save changes' onPress={onPressUpdate} color="purple"
                          style={{marginBottom: 20}}/>
        </ScrollViewContainer>

    );
}
