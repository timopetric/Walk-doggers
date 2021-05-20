import {Alert} from "react-native";
import * as React from "react";
import ImageUpload from "../../components/ImageUpload";
import {useContext, useEffect} from "react";
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import { useState } from "react";
import AuthContext from "../../navigation/AuthContext";



type Blog = {
    title: string,
    content: string,
    photo: string
}

async function postBlog({title, content, photo}: Blog, getJwt: Function, navigation: any) {

    let jwt = getJwt();
    const reqOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
        },
        body: JSON.stringify({
            title,
            content,
            photo
        }),
    };

    console.log(JSON.stringify({
        title,
        content,
        photo
    }));
    console.log("jwt: ",jwt,'\n')
    let response = await fetch(process.env.BASE_API_URL + '/blog/', reqOptions);
    const statusCode = response.status;
        switch (statusCode) {
            case 201:
                // successfully created dog
                Alert.alert("Blog post was succesfully created, now it needs to be approved by mods")
                navigation.goBack();
                break;
            case 403:
                Alert.alert("You need to be repoter to write blogs")
                break;
            case 422:
                Alert.alert("Data validation failed")
                break;

            default:
                // TODO: notify user about error
                Alert.alert("Error occured upsi...")
                break;
        }
    
    console.log("response: ",response.status)
    return await response.json();
}

export default function NewBlogPostScreen({navigation}: any) {
    const {isReporter, getRoles} = useContext(AuthContext);

    const [title, setTitle] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<string>("")
    const [desc, setDesc] = useState<string>("");

    const { getJwt } = React.useContext(AuthContext);
    
    const onPressAddBlog = async () => {
        const response = await postBlog({title: title, content: desc, photo: imgUrl}, getJwt, navigation)
        console.log(response);
    };

    useEffect(() => {
        getRoles().then(() => {
            if (!isReporter()) {
                alert('Restricted to reporters.')
                navigation.goBack();
            }
        })
    }, [])

    

    return (
        <ScrollViewContainer>
            <FormItem label={"TITLE"} getText={setTitle} placeholder={"Blog post title"}/>
            <FormItem label={"IMAGE"} >
                <ImageUpload saveUrl={setImgUrl} maxImages={10} showEdit={true}/>
            </FormItem>
            <FormItem label={"CONTENT"} placeholder={"Blog content"}
                      height={150} getText={setDesc}/>
            <ButtonCustom text="Create Blog Post" color={"purple"} onPress={onPressAddBlog}/>
        </ScrollViewContainer>
    );
}
