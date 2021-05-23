import * as React from 'react';
import {ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Card from "../components/Card";
import {View, Text} from "react-native";
import ExploreFilter from "../components/ExploreFilter";

import {Provider} from "react-redux";
import {store, toggleFilter} from "../redux/store";
import {useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import AuthContext from '../navigation/AuthContext';
import {GRAY_2, PRIMARY, PINKISH_WHITE, PRIMARY_DARK, RED, GREEN} from '../constants/Colors';
import {format} from "date-fns";
import {useNavigation} from "@react-navigation/native";
import {BASE_API_URL} from "../localConstants";

const imageUrl = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod empor incididunt ut labore et dolore magna aliqua.'

// function navigateToListingScreen(props: any, navigation: any) {
//     navigation.navigate('DogScreen');
// }

type Listing = {
    title: string,
    description: string,
    date_from: "2021-05-18T20:17:26.542Z",
    date_to: "2021-05-18T20:17:26.542Z",
    lat: number,
    lon: number,
    dog_id: "string",
    id: "string",
    author_id: "string",
    location_text: "string",
}

type Author = {
    email: string,
    first_name: string,
    last_name: string,
    description: string,
    image_url: string,
    id: string
}

type Dog = {
    name: string,
    description: string,
    size_category: number,
    photo: string,
    id: string
}

type Applications = {
    status: string,
    id: string,
    listing_author_to_applied_user_left_rating: boolean,
    applied_user_to_listing_author_left_rating: boolean
}

type ListingsArray = [{
    title: string,
    description: string,
    date_from: Date,
    date_to: Date,
    lat: number,
    lon: number,
    dog_id: "string",
    id: "string",
    author_id: "string",
    location_text: "string",
    author: Author,
    dog: Dog,
    applications: Applications
}]

type FillteredListingsArray = {
    title: string,
    description: string,
    date_from: Date,
    date_to: Date,
    lat: number,
    lon: number,
    dog_id: string,
    id: string,
    author_id: string,
    location_text: string,
    author: Author,
    dog: Dog,
    distance: string
}

type Location = {
    lon: number,
    lat: number,
}

type FilteredListingParams = {
    user_lat?: number
    user_lon?: number
    user_dist?: number
    user_dog_size0: boolean
    user_dog_size1: boolean
    user_dog_size2: boolean
    user_dog_size3: boolean
    user_dog_size4: boolean
}

const setParams = (params: any) => {
    let urlBuilder = new URLSearchParams(BASE_API_URL + "/listings/");
    console.log(urlBuilder.toString())
    for (const [key, value] of Object.entries(params)) {
        if (value) {
            urlBuilder.append(key, value)
        }
    }
    //console.log(urlBuilder.toString())
    return urlBuilder.toString()

}

async function getListings(getJwt: Function) {

    let jwt = getJwt();

    const reqOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
    };
    const params = {
        'neki': 1,
        'jou': 3
    }
    console.log("jwt: ", jwt, '\n')
    let response = await fetch(BASE_API_URL + '/listings/', reqOptions);

    console.log("urlbuilder: ", setParams(params));
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

async function getFilteredListings(getJwt: Function, params: any) {

    let jwt = getJwt();

    const reqOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + jwt,
            'Credentials': jwt
        },
    };

    let query = setParams(params)
    const url = BASE_API_URL + '/listings/explore/?' + query;
    console.log(url)
    console.log("jwt: ", jwt, '\n')
    let response = await fetch(url, reqOptions);
    const statusCode = response.status;
    console.log("status: ", statusCode)
    switch (statusCode) {
        case 200:
            // successfully created dog
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

    console.log("response: ", response.status)
}

const categories = [
    "1-5",
    "5-10",
    "10-20",
    "20-40",
    "40+",
]

const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    console.log("location status :", status)
    if (status !== 'granted') {
        return;
    }
    let location;
    try {
        location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        return location;
    } catch (e) {
        console.log("Getlocation error: ", e)
        return;
    }


}
export default function TabExplore({navigation}: any) {
    const [location, setLocation] = useState<{} | undefined>({});
    const [errorMsg, setErrorMsg] = useState("");
    const [distance, setDistance] = useState(200);
    const [selectedIndexes, setSelectedIndexes] = useState(new Set([0, 1, 2, 3, 4]));
    const [listings, setListings] = useState<ListingsArray | null>(null)
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const {getJwt} = useContext(AuthContext)
    useEffect(() => {
        const getUserLocation = async () => {
            const location = await getLocation();
            if (location != undefined)
                setLocation(location);
            else
                setErrorMsg('Permission to access location was denied');
        }
        getUserLocation()
    }, [])

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)

            if (location != undefined) {
                const props: FilteredListingParams = {
                    'user_lat': location?.coords?.latitude || undefined,
                    'user_lon': location?.coords?.longitude || undefined,
                    'user_dist': distance || undefined,
                    'user_dog_size0': selectedIndexes.has(0),
                    'user_dog_size1': selectedIndexes.has(1),
                    'user_dog_size2': selectedIndexes.has(2),
                    'user_dog_size3': selectedIndexes.has(3),
                    'user_dog_size4': selectedIndexes.has(4),
                }
                console.log(props)
                const listings = await getFilteredListings(getJwt, props);

                console.log("location", location)
                console.log("listings", listings)

                if (listings != null) {
                    setListings(listings)
                    setIsLoading(false)
                } else
                    setErrorMsg('No listings');
            }

        }

        getData();
    }, [location, distance, selectedIndexes]);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        console.log(text)
    }


    return (
        <View style={styles.container}>
            <Provider store={store}>
                <View style={{width: 880, maxWidth: "100%"}}>
                    <ExploreFilter distance={distance} setDistance={setDistance} selectedIndexes={selectedIndexes}
                                   setSelectedIndexes={setSelectedIndexes} multiple={true} categories={categories}/>
                </View>
            </Provider>
            {isLoading ?
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator  color={PRIMARY}/>
                </View>
                :
                <FlatList
                    data={listings}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    style={[{paddingTop: 20, flex: 1}]}
                    contentContainerStyle={{alignItems: "center"}}
                />
            }
        </View>
    );
}

function renderItem({item}: any) {
    // <Card  name={item.name} url={item.photo} description={item.description} id={item.id}/>
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date_from = new Date(item.date_from.toString());
    const date_to = new Date(item.date_to.toString());
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    //@ts-ignore
    const date_item = date_from.toLocaleDateString('de-DE', options);
    const hours = `${format(date_from, 'HH:mm')} - ${format(date_to, 'HH:mm')}`

    return (
        <Card
            content={item.description}
            callToActionText={'Take me for a walk'}
            imageUrl={item.dog.photo}
            title={item.title}
            date={date_item}
            day={daysOfWeek[date_from.getDay()]}
            distance={item.distance}
            listing_id={item.id}
            time={hours}
            navigateTo={'ListingScreen'}
            payload={{listing: item}}
            // onPress={() => navigation.navigate('ListingScreen', item)}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
