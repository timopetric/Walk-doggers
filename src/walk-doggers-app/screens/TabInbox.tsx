import {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import * as React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import MessageThread from '../components/MessageThread'
import {Text, View} from 'react-native';
import {ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import CarouselCards from '../components/CarouselCards'
import AuthContext from '../navigation/AuthContext';

type ConversationsType = {
    user_other: {
        id: string,
        last_name: string,
        image_url: string,
        first_name: string,
        description: string,
        email: string,
    },
    id_conv: string
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


    const url = process.env.BASE_API_URL + '/conversations';
    console.log(url)

    let response = await fetch(url, reqOptions);
    const statusCode = response.status;
    console.log("status: ", statusCode)
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


export default function TabInbox({navigation}: any) {
    const [convos, setConvos] = useState<ConversationsType[]>([])
    const [error, setError] = useState<string | null>(null)
    const {getJwt} = useContext(AuthContext)

    
    const onPress = () => {
        navigation.navigate('MessageScreen')
    };

    useEffect(() => {
        const getUserConversations = async () => {
            const conversations = await getUserConvos(getJwt);
            console.log("conversations :", conversations)
            if (!conversations.length || conversations == undefined)
                setError('No Conversations');
            else if (conversations.length)
                setConvos(conversations);
            else
                setError('Error upsi...');
        }
        getUserConversations()
    }, [])

    return (
        <View style={styles.containter}>
            <CarouselCards inChat={false}/>
            <ScrollView>
                <View style={{height: 10}}/>
                {convos.length ? convos.map(convo => (
                   <MessageThread 
                        name={convo?.user_other?.first_name || "error"} 
                        lastMessage="PLACEHOLDER GET MESSAGES"
                        key={convo?.id_conv || "error"}
                        onPress={onPress}
                    />)
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
