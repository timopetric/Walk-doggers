import React from "react";

import {Image, StyleSheet, View, Text, Dimensions, TouchableOpacity, Platform} from "react-native";
import {Card} from "react-native-elements";
import {BLUE, GRAY_1} from '../constants/Colors';


const dimensions = Dimensions.get('window');


const BlogCard = props => {
    const {title, content, author, imageUrl} = props;
    return <View style={styles.card}>
        <Image
            style={styles.image}
            source={{uri: imageUrl}}
        />
        <View style={{padding: 16}}>
            <Text style={styles.date}>{author}</Text>
            <Text style={styles.dogName}>{title}</Text>
            <Text style={styles.description}>{content}</Text>
            <View style={styles.imageRow}>
                <TouchableOpacity>
                    <Text style={styles.takeMeWalk}>READ MORE</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    // return <Card>
    //     <Image
    //         style={styles.dogCard}
    //         source={{uri: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop'}}
    //     />
    //
    //     <View style={styles.imageRow}>
    //         <Text style={styles.author}></Text>
    //         <Text style={styles.confirmedText}></Text>
    //     </View>
    //
    //     <Text style={styles.title}>{this.props.title}</Text>
    //     <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    //         incididunt ut labore et dolore magna aliqua.</Text>
    //     <View style={styles.imageRow}>
    //         <Text style={styles.readMore}>Read more</Text>
    //     </View>
    // </Card>
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
        justifyContent: "flex-end"
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
        height: Platform.OS === 'web' ? 300 : null,
        aspectRatio: 4 / 3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
});


export default BlogCard;
