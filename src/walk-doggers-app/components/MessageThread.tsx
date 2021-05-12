import { FontAwesome } from "@expo/vector-icons";
import React from "react";

import {Image, StyleSheet, View, Text, Dimensions} from "react-native";
import {Card} from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const logo = require("../assets/images/image.jpg");

interface IMessageThreadProps {
    name?: string;
    lastMessage?: string;
    onPress?: any;
}

interface IMessageThreadState {
}

class MessageThread extends React.Component<IMessageThreadProps, IMessageThreadState> {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
              <View style={styles.imageRow}>
                  <Image source={logo} style={styles.image}></Image>
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.lastMessage}>{this.props.lastMessage}</Text>
                  </View>
              </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 35
    },
    name: {
      fontFamily: "roboto",
      fontWeight: "bold",
      fontSize: 18
    },
    lastMessage: {
      fontFamily: "roboto",
      fontSize: 16
    },
    textContainer: {
      paddingLeft: 20,
      flexDirection: "column",
      justifyContent: "center",
      height: 70
    }
})

export default MessageThread
