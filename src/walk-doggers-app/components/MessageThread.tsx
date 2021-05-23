import {FontAwesome} from "@expo/vector-icons";
import React from "react";

import {Image, StyleSheet, View, Text, Dimensions, Platform} from "react-native";
import {Card} from "react-native-elements";
import {TouchableOpacity} from "react-native-gesture-handler";
import {GREEN, ORANGE, RED} from '../constants/Colors';

const logo = require("../assets/images/image.jpg");

interface IMessageThreadProps {
    name?: string;
    lastMessage?: string;
    imageUrl?: string;
    onPress?: any;
    requested: any;
}

interface IMessageThreadState {
}

class MessageThread extends React.Component<IMessageThreadProps, IMessageThreadState> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.imageRow}>
                    <Image source={{uri: this.props.imageUrl}} style={styles.image}></Image>
                    <View style={styles.textContainer}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={styles.name}>{this.props.name}</Text>
                            {this.props.requested && <Text style={styles.status}>Requested</Text>}
                        </View>
                        <Text style={styles.lastMessage} numberOfLines={1}
                              ellipsizeMode='tail'>{this.props.lastMessage}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 35
    },
    name: {
        // fontFamily: "roboto",
        fontWeight: Platform.OS === 'android' ? "bold" : "600",
        fontSize: 17,
        // marginBottom: 2
    },
    lastMessage: {
        fontFamily: "roboto",
        marginTop: 3,
        fontSize: 14
    },
    textContainer: {
        paddingLeft: 12,
        flexDirection: "column",
        justifyContent: "center",
        height: 70,
        flex: 1,
    },
    status: {
        // marginTop: Platform.OS === 'web' ? 16 : 16,
        fontWeight: "500",
        fontSize: 12,
        textTransform: "uppercase",
        color: ORANGE
    }
})

export default MessageThread
