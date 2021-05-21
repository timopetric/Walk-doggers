import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import Card from "../../components/Card";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../navigation/AuthContext";
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused} from "@react-navigation/native";


export default function TabBlog() {
    const {getJwt} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [blogs, setBlogs] = useState<Object[]>([])

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
                var json2 = await data2.json()
            }
            var merged = json2 != undefined ? json1.concat(json2) : json1
            setBlogs(merged)

        })
    }

    const renderItem = ({item}) => (
        <Card title={item.title} content={item.content}
              author={item.author.first_name.concat(" " + item.author.last_name)} modConfirmed={item.approved}
              blogId={item.id}
              imageUrl={item.photo} callToActionText={'Read more'} navigateTo={'BlogPostScreen'}
              payload={{
                  title: item.title,
                  content: item.content,
                  imageUrl: item.photo,
                  author: item.author.first_name.concat(" " + item.author.last_name),
                  modConfirmed: item.approved,
                  blogId: item.id
              }}/>
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
