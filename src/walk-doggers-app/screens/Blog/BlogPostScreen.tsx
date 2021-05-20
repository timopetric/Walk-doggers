import {Dimensions, Image, ScrollView, StyleSheet, Text, View, Platform} from "react-native";
import * as React from "react";
import {GRAY_1} from "../../constants/Colors";
import ButtonCustom from "../../components/ButtonCustom";
import AuthContext from "../../navigation/AuthContext";
import {useContext} from "react";
import {useNavigation} from "@react-navigation/native";


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

async function acceptPost (blogId: String, getJwt: Function){
    let jwt = getJwt();
    const reqOptions = {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
        },
        body: JSON.stringify({
            "approved": true
        }),
    };
    let response = await fetch(process.env.BASE_API_URL + '/blog/' + blogId, reqOptions);
    return await response.json();

}

async function deletePost (blogId: String, getJwt: Function) {
    let jwt = getJwt();
    const reqOptions = {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt,
        },
    };
    let response = await fetch(process.env.BASE_API_URL + '/blog/' + blogId, reqOptions);
    return await response.json();

}

const BlogPostScreen = (props: any) => {
    const {author, content, date, imageUrl, title, modConfirmed, blogId} = props.route.params;
    const {isAdmin, getJwt} = useContext(AuthContext)
    const navigation = useNavigation();

    const onPressAcceptPost = async () => {
        const response = await acceptPost(blogId, getJwt)
        console.log(response);
        navigation.goBack()
    };

    const onPressDeletePost = async () => {
        const response = await deletePost(blogId, getJwt)
        console.log(response);
        navigation.goBack()
    };

    console.log("isadmin: " + isAdmin())

    
    return (
      <ScrollView>
        <Image style={styles.image} source={{ uri: imageUrl }} />

        <View style={styles.container}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        {!modConfirmed && (
          <View style={styles.moderatorBtn}>
            <ButtonCustom
              text={"Reject"}
              color={"red"}
              style={{ flex: 1, paddingHorizontal: 15 }}
            />
            <ButtonCustom
              text={"Accept"}
              color={"green"}
              style={{ flex: 1, paddingHorizontal: 15 }}
              onPress={onPressAcceptPost}
            />
          </View>
        )}
        {isAdmin() &&
        <ButtonCustom
          text={"Remove Blog Post"}
          color={"red"}
          style={{ flex: 1, paddingHorizontal: 15 }}
          onPress={onPressDeletePost}
        />
}
      </ScrollView>
    );
}

export default BlogPostScreen;
