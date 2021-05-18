import {Dimensions, Image, ScrollView, StyleSheet, Text, View, Platform} from "react-native";
import * as React from "react";
import {GRAY_1} from "../../constants/Colors";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    image: {
        width: "100%",
        height: Platform.OS === 'web' ? 300 : undefined,
        aspectRatio: 4 / 3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    author: {
        color: GRAY_1,
        fontWeight: "500"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    date: {

    },
    content: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14
    },
});

const BlogPostScreen = (props: any) => {
    const {author, content, date, imageUrl, title} = props.route.params;
    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: imageUrl}}
            />

            <View style={styles.container}>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
        </ScrollView>
    );
}

export default BlogPostScreen;
