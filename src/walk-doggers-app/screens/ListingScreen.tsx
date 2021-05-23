import {Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, Alert} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import * as React from "react";
import {PRIMARY} from "../constants/Colors";
import AboutMeCard from "../components/AboutMeCard";
import {categories} from "../constants/Values";
import {useEffect} from "react";
import {format} from "date-fns";
import AuthContext from "../navigation/AuthContext";
import {useNavigation} from "@react-navigation/core";
import {BASE_API_URL} from "../localConstants";
import MessageThread from "../components/MessageThread";


const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 50,
        maxWidth: 900,
        backgroundColor: "white",
    },
    image: {
        width: "100%",
        height: Platform.OS === "web" ? 300 : undefined,
        aspectRatio: 4 / 3,
    },
    listingTitle: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "red-hat-text-500",
        paddingBottom: 10,
    },

    description: {
        paddingBottom: 10,
        fontSize: 17,
        fontFamily: "red-hat-text",
    },
    imageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
        fontFamily: "red-hat-text-500",
    },
    miniImage: {
        width: imgWidth / 5,
        height: imgWidth / 5,
        borderRadius: imgWidth / 5,
    },
    aboutCard: {
        flexDirection: "row",
    },
    appButtonContainer: {
        elevation: 2,
        backgroundColor: PRIMARY,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: -25,
        width: 160,
        zIndex: 10,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        marginBottom: 5,
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "red-hat-text-500",
        alignSelf: "center",
    },
});

const ListingScreen = (props) => {
    const {route} = props;
    const {params} = route;
    const {listing} = params;
    const {getJwt} = React.useContext(AuthContext);
    const navigation = useNavigation();
    console.log(listing);

    let day_from = "";
    let time_from = "";
    let time_to = "";

    if (listing?.date_from) {
        day_from = format(new Date(listing?.date_from), "iiii");
        time_from = format(new Date(listing?.date_from), "HH:mm");
        time_to = format(new Date(listing?.date_to), "HH:mm");
    }

    const imInterested = () => {
        const reqOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + getJwt(),
            },
            body: JSON.stringify({
                listing_id: listing.id,
                soft: true
            }),
        };
        fetch(BASE_API_URL + "/applications/", reqOptions);
    };

    const createConversation = async () => {
        const reqOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + getJwt(),
            },
            body: JSON.stringify({
                user2Id: listing.author_id,
            }),
        };
        const response = await fetch(BASE_API_URL + "/conversations", reqOptions);
        if (response.ok) {
            return response.json();
        }
    }

    const apply = () => {
        imInterested()
        navigation.navigate('Inbox', {screen: 'MessageScreen', params: listing.author})

        // navigation.navigate('MessageScreen', listing.author);

        // createConversation().then(response => {
        //     if (response.ok) {
        //         return response.json()
        //     }
        // }).then(json => {
        //     console.log(json);
        // });
        // navigation.goBack()
    }


    console.log(day_from, listing?.date_from);
    return (
        <ScrollView style={{backgroundColor: "white"}}
                    contentContainerStyle={{alignItems: 'center'}}>
            <View style={{width: 1200, maxWidth: "100%"}}>

                <Image
                    style={styles.image}
                    source={{uri: listing?.dog?.photo}}
                    resizeMode="cover"
                />
                <View style={[{alignItems: "flex-end", right: 25}]}>
                    <TouchableOpacity
                        style={styles.appButtonContainer}
                        activeOpacity={0.9}
                        onPress={apply}
                    >
                        <Text style={styles.appButtonText}>I’m Interested</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style={styles.listingTitle}>{listing?.title}</Text>
                    <Text style={styles.description}>{listing?.description}</Text>
                    <Text style={styles.subtitle}>When</Text>
                    <Text style={styles.description}>
                        {day_from} {time_from} - {time_to}
                    </Text>
                    <Text style={styles.subtitle}>Where</Text>
                    <Text style={styles.description}>{listing?.location_text}</Text>
                    <Text style={styles.subtitle}>About Me</Text>

                    <AboutMeCard
                        image={listing?.dog?.photo}
                        name={listing?.dog?.name}
                        descr={listing?.dog?.description}
                        isDog={true}
                        value={0}
                    />

                    <Text style={styles.subtitle}>About Owner</Text>
                    <AboutMeCard
                        image={listing?.author?.image_url}
                        name={listing?.author?.first_name + " " + listing?.author?.last_name}
                        descr={listing?.author?.description}
                        isDog={false}
                        value={3}
                    />
                </View>
            </View>

        </ScrollView>
    );
}

export default ListingScreen
