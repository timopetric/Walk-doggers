import React from "react";

import {
    Image,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Pressable,
    TouchableHighlight,
    TouchableOpacity,
    Platform
} from "react-native";
import {BLUE, GRAY_3, GRAY_0, GRAY_1, GRAY_2} from '../constants/Colors';
import {useNavigation} from "@react-navigation/native";


const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width * 0.85;


const Card = (props: any) => {
    const navigation = useNavigation();
    const {date, title, content, distance, imageUrl, author, onPress, callToActionText} = props;
    return <View style={styles.card}>
        <Image
            style={styles.image}
            source={{uri: imageUrl}}
        />
        <View style={{padding: 16}}>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                {author && <Text style={styles.date}>{author}</Text>}
                {date && <Text style={styles.date}>{date}</Text>}
            </View>
            <Text style={styles.dogName}>{title}</Text>
            <Text style={styles.description}>{content}</Text>
            <View style={styles.imageRow}>
                <Text style={styles.distance}>{distance}</Text>
                <TouchableOpacity onPress={() => onPress(props, navigation)}>
                    <Text style={styles.takeMeWalk}>{callToActionText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    dogName: {
        fontSize: 23,
        fontWeight: "500",
        marginTop: 6
    },
    date: {
        color: GRAY_1,
        fontWeight: "500"
    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1
    },
    takeMeWalk: {
        color: BLUE,
        textTransform: "uppercase",
        fontWeight: "bold",
        alignContent: "flex-end",
    },
    card: {
        backgroundColor: "#fff",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 1,
        flex: 1,
        // padding: 10,
        margin: 10,
        borderRadius: 12,
    },
    image: {
        width: "100%",
        height: Platform.OS === 'web' ? 300 : undefined,
        aspectRatio: 4 / 3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
        // flex:1,
        // alignSelf: "center"
    },
});
export default Card;
