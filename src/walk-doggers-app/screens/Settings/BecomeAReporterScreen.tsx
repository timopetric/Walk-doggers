import {Button, Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, GREEN} from "../../constants/Colors";
import {Input} from 'react-native-elements';
import {Entypo, Ionicons} from "@expo/vector-icons";
import ButtonCustom from "../../components/ButtonCustom"
import {useContext} from "react";
import AuthContext from "../../navigation/AuthContext";
import {BASE_API_URL} from "../../localConstants";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    content: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",

    },
});


const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At elementum eu facilisis sed. Enim neque volutpat ac tincidunt vitae semper quis. Imperdiet dui accumsan sit amet nulla facilisi morbi. Mus mauris vitae ultricies leo integer malesuada nunc vel. Sit amet risus nullam eget felis. Proin fermentum leo vel orci. Elementum integer enim neque volutpat. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Cras semper auctor neque vitae tempus quam pellentesque. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Cum sociis natoque penatibus et magnis dis parturient.\n" +
    "\n" +
    "Amet nisl suscipit adipiscing bibendum est ultricies. In egestas erat imperdiet sed euismod nisi porta lorem. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Gravida neque convallis a cras. Purus non enim praesent elementum facilisis leo vel fringilla. Nibh ipsum consequat nisl vel pretium lectus. Eros in cursus turpis massa tincidunt. Iaculis nunc sed augue lacus viverra. Id porta nibh venenatis cras. Condimentum lacinia quis vel eros donec ac odio tempor.\n" +
    "\n" +
    "Varius vel pharetra vel turpis nunc eget lorem dolor sed. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Nec dui nunc mattis enim ut tellus. Massa sapien faucibus et molestie ac feugiat sed lectus. Nisi est sit amet facilisis magna. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Suspendisse faucibus interdum posuere lorem ipsum dolor. Feugiat pretium nibh ipsum consequat nisl vel pretium. Volutpat ac tincidunt vitae semper quis lectus nulla. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Et sollicitudin ac orci phasellus egestas. Egestas integer eget aliquet nibh praesent tristique magna sit. Donec ac odio tempor orci. Ut lectus arcu bibendum at. Id cursus metus aliquam eleifend. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui.\n" +
    "\n" +
    "Mattis nunc sed blandit libero volutpat sed. Accumsan in nisl nisi scelerisque eu. Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu. Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Phasellus egestas tellus rutrum tellus pellentesque. Amet risus nullam eget felis eget nunc lobortis. Quisque non tellus orci ac. Non quam lacus suspendisse faucibus interdum posuere lorem. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Faucibus purus in massa tempor nec. Eget aliquet nibh praesent tristique magna sit. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Metus dictum at tempor commodo ullamcorper a lacus. Odio ut enim blandit volutpat maecenas volutpat blandit. Eu lobortis elementum nibh tellus molestie nunc. Id cursus metus aliquam eleifend.\n" +
    "\n" +
    "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Dui id ornare arcu odio. Ut enim blandit volutpat maecenas volutpat blandit. Mi ipsum faucibus vitae aliquet nec. Phasellus vestibulum lorem sed risus ultricies. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Cursus in hac habitasse platea dictumst. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Rhoncus est pellentesque elit ullamcorper dignissim. Sit amet aliquam id diam. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Ultrices sagittis orci a scelerisque purus semper eget duis at. Euismod in pellentesque massa placerat duis ultricies lacus sed. Malesuada proin libero nunc consequat interdum varius sit. Feugiat in ante metus dictum at. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Sed odio morbi quis commodo odio aenean sed."


export default function BecomeAReporterScreen({navigation}: any) {
    const {getJwt, getRoles} = useContext(AuthContext);

    const confirm = () => {
        const jwt = getJwt();
        fetch(BASE_API_URL + '/auth/roles/become_reporter', {
            method: "POST",
            headers: {
                "accept": "application/json",
                'Authorization': 'Bearer ' + jwt
            },
        }).then(async response => {
            if (response.ok) {
                getRoles().then(() => {
                    alert("You are now a reporter");
                    navigation.goBack();
                })
            } else {
            }
        }).catch(e => {
            console.log(e);
        })
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Terms & Conditions</Text>
                <Text style={styles.content}>{lorem}</Text>
                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}>
                    <Ionicons size={24} style={{alignItems: "center", marginRight: 4}} name="checkbox"
                              color={GREEN}/>
                    <Text style={{fontWeight: "600"}}>

                        I Accept and agree to the terms & conditions
                    </Text>
                </View>

                <ButtonCustom text='Become a reporter' onPress={() => confirm()}
                              color="purple"/>
            </View>
        </ScrollView>
    );
}
