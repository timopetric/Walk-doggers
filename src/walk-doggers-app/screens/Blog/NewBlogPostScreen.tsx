import * as React from "react";
import ImageUpload from "../../components/ImageUpload";
import {useContext, useEffect} from "react";
import AuthContext from "../../navigation/AuthContext";
import FormItem from "../../components/FormItem";
import ButtonCustom from "../../components/ButtonCustom";
import ScrollViewContainer from "../../components/ScrollViewContainer";


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
        <ScrollViewContainer>
            <FormItem label={"TITLE"} placeholder={"Blog post title"}/>
            <FormItem label={"IMAGE"}>
                <ImageUpload saveUrl={saveUrl} maxImages={10} showEdit={true}/>
            </FormItem>
            <FormItem label={"CONTENT"} placeholder={"Blog content"}
                      height={150}/>
            <ButtonCustom text="Create Blog Post" color={"purple"}/>
        </ScrollViewContainer>
    );
}
