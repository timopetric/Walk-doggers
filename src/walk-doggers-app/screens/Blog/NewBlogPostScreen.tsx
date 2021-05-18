import {Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ImageUpload from "../../components/ImageUpload";
import { useState } from "react";
import FormTextInput from "../../components/FormInput";
import ButtonForm from "../../components/ButtonForm";
import AuthContext from "../../navigation/AuthContext";

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
    multiLineInput:{
        borderRadius: 3,
        backgroundColor: "rgba(205, 205, 205, 1)",
        paddingHorizontal: 10,
    },
    input: {
        height: 48,
        padding: 1,
        marginBottom: 12,
        backgroundColor: 'rgba(205, 205, 205, 1)',
        borderRadius: 3,
        paddingHorizontal: 10,
      },
    separator: {
        marginBottom: 20,
    },
});
const MultiLineTextInput = (props:any) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={80}
      />
    );
  }

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
    const [title, setTitle] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<string>("")
    const [desc, setDesc] = useState<string>("");

    const { getJwt } = React.useContext(AuthContext);
    
    const onPressAddBlog = async () => {
        const response = await postBlog({title: title, content: desc, photo: imgUrl}, getJwt, navigation)
        console.log(response);
    };

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
                <ImageUpload saveUrl={setImgUrl} maxImages={1}/>
                <Text style={styles.subtitle}>Content</Text>
                <MultiLineTextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={(text:string) => setDesc(text)}
                    value={desc}
                    backgroundColor="rgba(205, 205, 205,1)"
                    style={styles.multiLineInput}
                />

                <View style={styles.separator}></View>
                <ButtonForm
                    title={"Publish Blog"}
                    onClickHandler={onPressAddBlog}
                    primary={false}
                    testId={"log"}
                />
            </View>
        </ScrollView>
    );
}
