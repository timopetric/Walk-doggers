import {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import * as React from 'react';
import MessageThread from '../components/MessageThread'
import {Text, View} from 'react-native';
import {ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import CarouselCards from '../components/CarouselCards'
import AuthContext from '../navigation/AuthContext';
import {useIsFocused} from "@react-navigation/native";
import {BASE_API_URL} from "../localConstants";

type ConversationsType = {
    user_other: {
        id: string,
        last_name: string,
        image_url: string,
        first_name: string,
        description: string,
        email: string,
    },
    id_conv: string,
    last_message_text: string
}

async function getUserConvos(getJwt: Function) {

    let jwt = getJwt();

    const reqOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + jwt,
            'Credentials': jwt
        },
    };


    const url = BASE_API_URL + '/conversations';

    let response = await fetch(url, reqOptions);
    const statusCode = response.status;
    switch (statusCode) {
        case 200:
            // successfully created dog
            break;
        case 403:
            Alert.alert("You need to be authorized to see listings")
            break;

        default:
            // TODO: notify user about error
            Alert.alert("Error occured upsi...")
            break;
    }

    console.log("response: ", response.status)
    return await response.json();
}

async function getConversations(getJwt: Function) {

    let jwt = getJwt();

    const reqOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + jwt,
            'Credentials': jwt
        },
    };


    const url = BASE_API_URL + '/inbox';

    let response = await fetch(url, reqOptions);
    const statusCode = response.status;
    switch (statusCode) {
        case 200:
            return await response.json();
            break;
        case 403:
            Alert.alert("You need to be authorized to see listings")
            break;

        default:
            // TODO: notify user about error
            Alert.alert("Error occured upsi...")
            break;
    }
    return []
}

export default function TabInbox({navigation}: any) {
    const [convos, setConvos] = useState<ConversationsType[]>([])
    const [error, setError] = useState<string | null>(null)
    const {getJwt} = useContext(AuthContext)
    const isFocused = useIsFocused();
    const [shownUsersIds, setShownUsersIds] = useState([]);
    const [filter, setFilter] = useState(false);


    const onPress = (convo: any) => {
        navigation.navigate('MessageScreen', convo)
    };

    useEffect(() => {
        if (isFocused) {
            const getUserConversations = async () => {
                const conversations = await getConversations(getJwt);
                console.log("conversations :", conversations);
                if (!conversations.length || conversations == undefined)
                    setError("No Conversations");
                else if (conversations.length) setConvos(conversations);
                else setError("Error upsi...");
            };
            getUserConversations();
        }
    }, [])


    const filterUsers = (userIds, filter) => {
        setFilter(filter);
        setShownUsersIds(userIds || [])
    }

    return (
        <View style={styles.containter}>
            <CarouselCards inChat={false} filterUsers={filterUsers}/>
            <ScrollView>
                <View style={{height: 10}}/>
                {convos.length ? convos.map(convo => {
                        if (!filter || shownUsersIds.includes(convo?.user?.id)) {
                            return <MessageThread
                                name={convo?.user?.first_name + " " + convo?.user?.last_name || "error"}
                                lastMessage={convo.last_message_text}
                                key={convo?.user?.id || "error"}
                                imageUrl={convo.user.image_url}
                                onPress={() => navigation.navigate('MessageScreen', convo)}
                            />
                        }
                    }
                ) : <Text>ERROR</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    containter: {
        backgroundColor: "white",
        flex: 1
    }
});
