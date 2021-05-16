import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
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

const MultiLineTextInput = (props:any) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={80}
      />
    );
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
                <View style={styles.imageRow}>
                    <Image
                        style={styles.miniImage}
                        source={{uri: 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1257560163-scaled-e1610062322469.jpg'}}
                    />
                    <View style={[styles.miniImage, styles.addImage]}>
                        <Entypo size={imgWidth/10} name="plus" color={PRIMARY} />
                    </View>
                </View>
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
