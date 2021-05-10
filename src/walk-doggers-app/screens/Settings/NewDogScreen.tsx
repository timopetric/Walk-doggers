import {Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import {Card, Input} from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ButtonCustom from "../../components/ButtonCustom"
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {useState} from "react";
import {categories} from "../../constants/Values";


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
    selected: {
        backgroundColor: '#747575'
    },
    notSelected: {
        backgroundColor: '#e1e3e6'
    },
    touchable: {

    },
    text: {

    },
    sizesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    sizePickerBox: {
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 5,
    },
});

export default function NewDogScreen() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Dog's name</Text>
                <Input></Input>

                <Text style={styles.subtitle}>Description</Text>
                <Input></Input>

                <Text style={styles.subtitle}>Size</Text>
                <SizePicker/>


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
                <Input></Input>
            </View>
        </ScrollView>
    );
}

function SizePicker() {
    const [selected, setSelected] = useState(0);

    let sizePickerItems : any = [];
    categories.forEach((category, index, arr) => {
        sizePickerItems.push(
            <SizePickerBox category={category} selected = {selected} key={index} index={index} setSelected={setSelected}/>
        )
    })

    return <View style={styles.sizesRow}>{sizePickerItems}</View>

}

function SizePickerBox(props: any) {
    return (
        <Pressable style={styles.touchable} onPress={() => props.setSelected(props.index) }>
            <Card containerStyle={[styles.sizePickerBox, props.selected == props.index ? styles.selected : styles.notSelected]} wrapperStyle={styles.wrapper}>
                <Text style={styles.text}>{props.category}</Text>
                <Text style={styles.text}>kg</Text>
            </Card>
        </Pressable>
    )
}
