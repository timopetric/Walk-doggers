import {Dimensions, Image, ScrollView, StyleSheet, Text, View, Platform} from "react-native";
import * as React from "react";
import {GRAY_1} from "../../constants/Colors";
import ButtonCustom from "../../components/ButtonCustom";

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
        fontFamily: "red-hat-text-500"
    },
    title: {
        fontSize: 23,
        fontFamily: "red-hat-text-500",
        marginTop: 6
    },
    date: {

    },
    content: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        fontFamily: "red-hat-text",
    },
    moderatorBtn: {
        flexDirection: "row",
        flex: 1
    }
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
            <View style={styles.moderatorBtn}>
                <ButtonCustom text={"Reject"} color={"red"} style={{flex: 1, paddingHorizontal: 15}}/>
                <ButtonCustom text={"Accept"} color={"green"} style={{flex: 1, paddingHorizontal: 15}}/>
            </View>
            <ButtonCustom text={"Remove Blog Post"} color={"red"} style={{flex: 1, paddingHorizontal: 15}}/>
            

        </ScrollView>
    );
}

export default BlogPostScreen;
