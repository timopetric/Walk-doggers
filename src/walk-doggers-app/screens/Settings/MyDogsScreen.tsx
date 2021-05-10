import {Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ButtonCustom from "../../components/ButtonCustom"


const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    miniDogCard: {
        flexDirection: "row",
        margin: 20,
        borderRadius: 14,
        backgroundColor: GRAY_0,
        overflow: "hidden",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 10,
    },
    miniImage: {
        width: imgWidth / 4,
        height: imgWidth / 4,
        marginRight: 20,
        flex: 1
    },
    textContainer: {
        flex: 4,
    },
    editContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        flex: 1
    },
    editText: {
        color: BLUE,
        textTransform: "uppercase",
        fontWeight: "bold",
        alignContent: "flex-end",
    }
});


export default function MyDogsScreen() {
    return (
        <ScrollView>
            <MiniDogCard name={'Buddy'}/>
            <MiniDogCard name={'Snoop Dog'}/>
        </ScrollView>
    );
}

function MiniDogCard(props: any) {
    return (
        <View style={styles.miniDogCard}>
            <Image
                style={styles.miniImage}
                source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'}}
            />

            <View style={{justifyContent: 'flex-end', flexDirection: 'row', flex: 2}}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>{props.name}</Text>
                    <Text>Golden retriever</Text>
                </View>

                <View style={styles.editContainer}>
                    <Pressable onPress={() => alert('TODO implement')}>
                        <Text style={styles.editText}>Edit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
