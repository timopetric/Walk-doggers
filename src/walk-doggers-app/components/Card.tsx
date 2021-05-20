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
import {BLUE, GRAY_3, GRAY_0, GRAY_1, GRAY_2, ORANGE} from '../constants/Colors';
import {useNavigation} from "@react-navigation/native";


const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width * 0.85;


const Card = (props: any) => {
    const navigation = useNavigation();
    const {date, day, title, content, distance, imageUrl, author, onPress, callToActionText, time, modConfirmed} = props;
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={{ padding: 16 }}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            {author &&
              <View style={styles.fstRow}>
                <Text style={styles.date}>{author}</Text>
                {!modConfirmed && author && <Text style={styles.wait}>WAITING FOR APPROVAL</Text>}
              </View>
            }


            {date && (
              <View style={styles.row}>
                <View style={styles.dateRow}>
                  <Text style={styles.dateDay}>{day}</Text>
                  <Text style={styles.date}>{date}</Text>
                </View>
                <Text style={styles.time}>{time}</Text>
              </View>
            )}
          </View>
          <Text style={styles.dogName}>{title}</Text>
          <Text style={styles.description}>{content}</Text>
          <View style={styles.imageRow}>
            <Text style={[styles.distance, styles.date]}>{distance?.toFixed(2)} km || ''</Text>
            <TouchableOpacity onPress={() => onPress(props, navigation)}>
              <Text style={styles.takeMeWalk}>{callToActionText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
    dogName: {
        fontSize: 23,
        fontFamily: "red-hat-text-500",
        marginTop: 6
    },
    date: {
        color: GRAY_1,
        fontFamily: "red-hat-text",
        fontSize: 15
    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        fontFamily: "red-hat-text",
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
        alignContent: "flex-end",
        fontFamily: "red-hat-text-500",
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
        margin: 15,
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
    dateRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flex: 1
    },
    row: {
        flexDirection: "row",
        flex:1,
        justifyContent:"space-around",
        alignItems: "center"
    },
    dateDay: {
        color: GRAY_2,
        fontFamily: "red-hat-text-500",
        fontSize: 15,
        textTransform: "uppercase",
        paddingRight: 5,
    },
    time: {
        fontFamily: "red-hat-text-500",
        fontSize: 15,
        color: GRAY_3,
    },
    fstRow: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between"
    },
    wait: {
      fontFamily: "red-hat-text-500",
      color: ORANGE
    }

});
export default Card;
