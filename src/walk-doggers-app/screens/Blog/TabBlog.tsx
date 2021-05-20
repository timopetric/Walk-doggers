import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import Card from "../../components/Card";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../navigation/AuthContext";
import { FlatList } from 'react-native-gesture-handler';
import {useIsFocused} from "@react-navigation/native";

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
    const {getJwt} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [blogs, setBlogs] = useState<Object[]>([
        {
            title: "title 2",
            content: "blog content",
            photo: "https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png",
            id: "f3fabfe1-6497-47eb-9854-77f4d9a3f228",
            author: {
              email: "a@a.a",
              first_name: "first",
              last_name: "last",
              description: "",
              image_url: "https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png",
              id: "3ae209ff-37f0-4dbf-b96c-64a9790e5b71"
            },
            approved: false
          },
          {
            title: "title 3",
            content: "blog content",
            photo: "https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png",
            id: "f3fabfe1-6497-47eb-9854-77f4d9a3f229",
            author: {
              email: "a@a.a",
              first_name: "first1",
              last_name: "last1",
              description: "",
              image_url: "https://walk-doggers.s3.eu-central-1.amazonaws.com/download.png",
              id: "3ae209ff-37f0-4dbf-b96c-64a9790e5b72"
            },
            approved: false
          }
    ])

    useEffect(() => {
        if (isFocused) {
            fetchData()
        }
    }, [isFocused]);

    const fetchData = () => {
        Promise.all([
            fetch(process.env.BASE_API_URL + '/blog/', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getJwt()
                },
            }),
            fetch(process.env.BASE_API_URL + '/blog/unpublished/', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getJwt()
                },
            })
        ]).then(async ([data1, data2]) => {
            const status1 = data1.status
            var json1 = await data1.json()
            if (data2.status == 200) {
                var json2 = await data1.json()
            }
            var merged = json2 != undefined ? json1.concat(json2): json1
            setBlogs(merged)
    
        })
    }

    const renderItem = ({item}) => (
        <Card title={item.title} content={item.content} author={item.author.first_name.concat(" " + item.author.last_name)} modConfirmed={item.approved}
        imageUrl={item.photo} callToActionText={'Read more'} onPress={onPress}/>
    );

    return (
        <View style={styles.container}>

            <FlatList
                data={blogs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
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
