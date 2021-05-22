import * as React from "react";

import {useEffect, useState, useContext} from "react";
import {categories} from "../../constants/Values";

import AuthContext from "../../navigation/AuthContext";
import ImageUpload from "../../components/ImageUpload";
import SizeSelector from "../../components/SizeSelector";
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import {BASE_API_URL} from "../../localConstants";

function onPressAdd(navigation: any, dog: Dog, getJwt: any) {
    let jwt = getJwt()

    let reqBody: any = {}
    if (dog.name !== "") reqBody.name = dog.name;
    // TODO: make name field a required field, present an error if its empty
    if (dog.description !== "") reqBody.description = dog.description;
    if (dog.size_category !== -1) reqBody.size_category = dog.size_category;
    if (dog.photo !== "") reqBody.photo = dog.photo;

    // console.log(JSON.stringify(reqBody))
    // console.log('env BASE_API_URL: ', BASE_API_URL);
    // console.log(JSON.stringify(dog))

    fetch(BASE_API_URL + '/dogs/', {
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
        <ScrollViewContainer>
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
        </ScrollViewContainer>
    );
}
