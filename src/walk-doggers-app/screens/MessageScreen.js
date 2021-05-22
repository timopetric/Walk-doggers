import React, {useState, useContext, useCallback, useEffect} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Dimensions, Image, Modal, TouchableOpacity} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors, {PRIMARY, PINKISH_WHITE, GRAY_BUBLE, PINKISH_BUBLE, PRIMARY_DARK} from '../constants/Colors';
import CarouselListings from '../components/CarouselCards'
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import AuthContext from '../navigation/AuthContext';
import {BASE_API_URL} from "../localConstants";


export default function ChatScreen(props: any) {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation()
    // const [conversation, setConversation] = useState(props.route.params)
    const [user, setUser] = useState(props.route.params)
    const {getJwt} = useContext(AuthContext)
    const [imageUrl, setImageUrl] = useState()
    const [fstName, setFstName] = useState("")
    const [lstName, setLstName] = useState("")

    useEffect(() => {
        setName()
        getConversationMessages()
        const interval = setInterval(() => {
            getConversationMessages()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const setName = () => {
        setImageUrl(user?.image_url)
        setFstName(user?.first_name)
        setLstName(user?.last_name)
    }

    const getConversationMessages = () => {
        let jwt = getJwt();
        fetch(BASE_API_URL + "/inbox/" + user.id, {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt,
            },
        })
            .then(async (response) => {
                let json = await response.json();
                const statusCode = response.status;
                formatConversationMessages(json)
                switch (statusCode) {
                    case 200:
                        break;
                    case 422:
                        break;
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const formatConversationMessages = (json) => {
        const otherUser = user.id
        var array = []
        for (let message of Object.keys(json)) {
            var newMessage = {
                _id: json[message].id,
                text: json[message].text,
                createdAt: json[message].date,
                user: {
                    _id: otherUser != json[message].senderId ? 1 : 2,
                    avatar: user.image_url,
                }
            }
            array.unshift(newMessage)
        }
        setMessages(array)
    }

    const onSend = useCallback((messages = []) => {
        sendMessage(messages[0])
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );

    }, []);

    const sendMessage = (message) => {
        let jwt = getJwt();
        // let reqBody = {}
        // reqBody.text = message.text
        const reqBody = {receiver_id: user.id, message: message.text}

        fetch(
            BASE_API_URL + "/inbox",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt,
                },
                body: JSON.stringify(reqBody),
            }
        )
            .then(async (response) => {
                let json = await response.json();
                const statusCode = response.status;
                switch (statusCode) {
                    case 200:
                        break;
                    case 422:
                        break;
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <Ionicons
                        name="arrow-forward-circle"
                        style={{marginBottom: 5, marginRight: 5}}
                        size={32}
                        color={PRIMARY}
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: PINKISH_BUBLE,
                        padding: 5
                    },
                    left: {
                        backgroundColor: GRAY_BUBLE,
                        padding: 5
                    }
                }}
                textStyle={{
                    right: {
                        color: 'black',
                        fontFamily: "roboto"
                    },
                    left: {
                        color: 'black',
                        fontFamily: "roboto"
                    }
                }}

            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333'/>
        );
    }

    const renderInputToolbar = (props) => {
        //Add the extra styles via containerStyle
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderTopColor: "#E8E8E8",
                    borderTopWidth: 1,
                    padding: 8
                }}
            />
        );
    };

    const goBack = () => {
        navigation.goBack()
    };

    return (

        <SafeAreaView style={{flex: 1, backgroundColor: PRIMARY}} edges={['top']}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Ionicons size={28} style={{margin: 10, paddingBottom: 20}} name="chevron-back-outline"
                                  color={"white"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.container1}>
                    <Image
                        source={{uri: imageUrl}}
                        style={styles.miniImage}/>
                    <Text style={styles.name}>{fstName} {lstName}</Text>
                </View>
                <View style={{flex: 1}}></View>
            </View>
            <View style={{flex: 1, borderRadius: 30, backgroundColor: "white"}}>
                <CarouselCards inChat={true} user={user}/>
                <GiftedChat
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderBubble={renderBubble}
                    alwaysShowSend
                    renderSend={renderSend}
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                    timeTextStyle={{left: {color: 'black'}, right: {color: 'black'}}}
                    textInputStyle={{paddingTop: 10}}
                    // minInputToolbarHeight={100}
                    //renderInputToolbar={renderInputToolbar}
                />
            </View>
        </SafeAreaView>
    );
};

// export default ChatScreen;

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    miniImage: {
        width: 55,
        height: 55,
        borderRadius: 35,
        marginHorizontal: 8,
        alignSelf: "center",
        marginTop: 5
    },
    name: {
        alignSelf: "center",
        // fontFamily: "roboto-500",
        color: PINKISH_WHITE,
        fontSize: 14,
        fontWeight: "600",
        marginTop: 5,
        marginBottom: 10
    },
    container1: {
        alignItems: "center",
    },
    container2: {
        height: '100%',
        borderRadius: 55,
        marginTop: -40,
        backgroundColor: "white"

    }
});

