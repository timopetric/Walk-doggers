import * as React from "react";

import {useEffect, useState, useContext} from "react";
import {categories} from "../../constants/Values";

import AuthContext from "../../navigation/AuthContext";
import ImageUpload from "../../components/ImageUpload";
import SizeSelector from "../../components/SizeSelector";
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import {useNavigation} from "@react-navigation/native";

function onPressUpdate(navigation: any, dog: Dog, getJwt: any) {
    let jwt = getJwt()

    let reqBody: any = {}
    if (dog.name !== "") reqBody.name = dog.name;
    // TODO: make name field a required field, present an error if its empty
    if (dog.description !== "") reqBody.description = dog.description;
    if (dog.size_category !== -1) reqBody.size_category = dog.size_category;
    if (dog.photo !== "") reqBody.photo = dog.photo;

    fetch(process.env.BASE_API_URL + '/dogs/' + dog.id, {
        method: "PUT",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(reqBody)
    }).then(async response => {
        let json = await response.json();
        const statusCode = response.status;
        switch (statusCode) {
            case 200:
                // successfully updated dog
                navigation.goBack();
                break;
            case 422:
                alert("Inputs should not be empty!")
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
    id: string;
}


export default function EditDogScreen(props: any) {
    const {getJwt} = useContext(AuthContext);
    const [dog, setDog] = useState<Dog>({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation = useNavigation()

    useEffect(() => {
        setDog({...dog, size_category: selectedIndex})
        console.log(dog)
    }, [selectedIndex]);

    useEffect(() => {
        const dog = props.route.params
        setSelectedIndex(dog.size_category)
        setDog(dog)
    }, []);

    const saveUrl = (url: string) => {
        setDog({...dog, photo: url})
    }

    return (
        <ScrollViewContainer>
            <FormItem label={"NAME"} placeholder={"Enter dog's name"}
                      getText={(text) => setDog({...dog, name: text})} setText={dog.name}/>
            <FormItem label={"DESCRIPTION"} placeholder={"Describe your dog"}
                      getText={(text) => setDog({...dog, description: text})}
                      setText={dog.description}
                      height={150}/>
            <FormItem label={"SIZE"}>
                <SizeSelector categories={categories} selectedIndex={selectedIndex}
                              setSelectedIndex={setSelectedIndex} multiple={false}/>
            </FormItem>
            <FormItem label={"IMAGE"}>
                <ImageUpload saveUrl={saveUrl} maxImages={10} showEdit={true}/>
            </FormItem>
            <ButtonCustom text="Save Changes" color={"purple"} onPress={() => onPressUpdate(navigation, dog, getJwt)}/>
        </ScrollViewContainer>
    );
}
