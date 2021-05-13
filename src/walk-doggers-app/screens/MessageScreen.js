import React, {useState, useEffect, useCallback, Component} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Dimensions, Image, Modal} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors, { PRIMARY, PINKISH_WHITE, GRAY_BUBLE, PINKISH_BUBLE} from '../constants/Colors';
import CarouselCards from '../components/CarouselCards'
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
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
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
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

  return (

    <View style={{ flex: 1 }}>
     <View style={styles.container1}>
                <Image source={{uri: 'https://beta.finance.si//pics//cache_ch/challe-salle-foto-bruno-sedevcic-5b40a7709a46f.jpg.cut.1530963962-5b40a7fa5a7dc.jpg'}} style={styles.miniImage}></Image>
                <Text style={styles.name}>Saša Petrovič</Text>
            </View>
      <View style={{ flex: 1, marginTop: -40, borderRadius:55, backgroundColor: "white"}}>
        <CarouselCards inChat={true}></CarouselCards>
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
                timeTextStyle={{ left: { color: 'black' },right: { color:'black'} }}
                //renderInputToolbar={renderInputToolbar} 
                />
      </View>
    </View>
  );
};

export default ChatScreen;

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    miniImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginHorizontal: 8,
        alignSelf: "center",
        marginTop: 20
    },
    name: {
        alignSelf: "center",
        fontFamily: "roboto-500",
        color: PINKISH_WHITE,
        fontSize: 18,
        marginBottom: 50
    },
    container1: {
        backgroundColor: PRIMARY,
    },
    container2: {
        height: '100%',
        borderRadius:55,
        marginTop: -40,
        backgroundColor: "white"
        
    }
});

