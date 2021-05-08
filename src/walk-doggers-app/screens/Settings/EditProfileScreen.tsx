import {Button, Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY} from "../../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";

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
    subtitle: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 10,
    },
    miniImage: {
        width: imgWidth / 4,
        height: imgWidth / 4,
        borderRadius: imgWidth / 4,
        marginHorizontal: 8,
        alignSelf: "center",
        marginTop: 20,
    },
});


export default function EditProfileScreen() {
    return (
        <ScrollView>
            <Image
                style={styles.miniImage}
                source={{uri: 'https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg'}}
            />

            <View style={styles.container}>
                <Text style={styles.subtitle}>First name</Text>
                <Input></Input>
                <Text style={styles.subtitle}>Last name</Text>
                <Input></Input>
                <Text style={styles.subtitle}>Email</Text>
                <Input></Input>
                <Text style={styles.subtitle}>About me</Text>
                <Input></Input>

                <Button title='Save changes' onPress={() => alert('TODO implement')} color={PRIMARY}/>
            </View>
        </ScrollView>
    );
}
