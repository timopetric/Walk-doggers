import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from 'react-native';
import DogCard from "../components/DogCard";
import BlogCard from "../components/BlogCard";

const imageUrl = 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop';
const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const title = 'The best dog food according to experts';
export default function TabBlog() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <BlogCard title={title} content={content} author={"Author A."} date="TUESDAY 6.4.2020" modConfirmed={false}
                          imageUrl={imageUrl}/>
                <BlogCard title={title} content={content} author={"Author A."} date="TUESDAY 6.4.2020" modConfirmed={false}
                          imageUrl={imageUrl}/>
                <BlogCard title={title} content={content} author={"Author A."} date="TUESDAY 6.4.2020" modConfirmed={false}
                          imageUrl={imageUrl}/>
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
