import React from "react";

import {Image, StyleSheet, View, Text, Dimensions} from "react-native";
import {Card} from "react-native-elements";
import {BLUE} from '../constants/Colors';

interface IBlogCardProps {
    title?: string;
    date: string;
    content?: string;
    modConfirmed: boolean;
}

interface IBlogCardState {
}

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width * 0.85;
const styles = StyleSheet.create({
    dogCard: {
        width: imgWidth,
        height: imgWidth,
        alignSelf: "center"
    },
    title: {
        fontSize: 20
    },
    date: {

    },
    confirmedText: {

    },
    author: {

    },
    content: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12
    },
    imageRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1
    },
    readMore: {
        color: BLUE,
        textTransform: "uppercase",
        fontWeight: "bold",
        alignContent: "flex-end",
    }
});


class BlogCard extends React.Component<IBlogCardProps, IBlogCardState> {
    render() {
        return <Card>
            <Image
                style={styles.dogCard}
                source={{uri: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop'}}
            />

            <View style={styles.imageRow}>
                <Text style={styles.author}></Text>
                <Text style={styles.confirmedText}></Text>
            </View>

            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <View style={styles.imageRow}>
                <Text style={styles.readMore}>Read more</Text>
            </View>
        </Card>
    }
}

export default BlogCard;
