import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import Card from "../../components/Card";
import {useContext, useEffect} from "react";
import AuthContext from "../../navigation/AuthContext";

const imageUrl = 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop';
const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const title = 'The best dog food according to experts';

function onPress(props: any, navigation: any) {
    const {date, title, content, distance, imageUrl, author} = props;
    navigation.navigate('BlogPostScreen', {
        date: date,
        title: title,
        content: content,
        imageUrl: imageUrl,
        author: author
    });
}

export default function TabBlog() {
    const {getRoles} = useContext(AuthContext);


    useEffect(() => {
        getRoles().then(null);
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card title={title} content={content} author={"Author A."} modConfirmed={false}
                      imageUrl={imageUrl} callToActionText={'Read more'} onPress={onPress}/>
                <Card title={title} content={content} author={"Author A."} modConfirmed={false}
                      imageUrl={imageUrl} callToActionText={'Read more'} onPress={onPress}/>
                <Card title={title} content={content} author={"Author A."} modConfirmed={false}
                      imageUrl={imageUrl} callToActionText={'Read more'} onPress={onPress}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
