import * as React from 'react';
import {Alert, FlatList, Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Card from "../components/Card";
import {View, Text} from "react-native";
import ExploreFilter from "../components/ExploreFilter";

import {Provider} from "react-redux";
import {store, toggleFilter} from "../redux/store";
import {useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import AuthContext from '../navigation/AuthContext';

const imageUrl = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod empor incididunt ut labore et dolore magna aliqua.'

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
    date_from: "2021-05-18T20:17:26.542Z",
    date_to: "2021-05-18T20:17:26.542Z",
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

    console.log("jwt: ",jwt,'\n')
    let response = await fetch(process.env.BASE_API_URL + '/listings/', reqOptions);
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
    
    console.log("response: ",response.status)
    return await response.json();
}

function onPress(props: any, navigation: any){
    navigation.navigate('DogScreen');
}

const categories = [
    "1-5",
    "5-10",
    "10-20",
    "20-40",
    "40+",
]

const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("location status :", status)
    if (status !== 'granted') {
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
}
export default function TabExplore({navigation}: any) {
    const [location, setLocation] = useState<{} | undefined>({}) ;
    const [errorMsg, setErrorMsg] = useState("");
    const [distance, setDistance] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState(new Set([0]));
    const [listings, setListings] = useState<ListingsArray | null>(null)
    // useEffect(() => {
    // make api request for listings
    // }, [distance, selectedIndexes])

    
    
    const { getJwt } = useContext(AuthContext)
    

    useEffect(() => {
        const getData = async () => {
            const location = await getLocation();
            const listings = await getListings(getJwt);
            console.log(location)

            console.log(listings)
            if (location != undefined)
                setLocation(location);
            else 
                setErrorMsg('Permission to access location was denied');

            if (listings != null){
                setListings(listings)
            }
            else 
                setErrorMsg('No listings');
            
            
        } 
        
        getData();
      }, []);

    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      console.log(text)
    }
    const renderItem = ({ item } : any) => (
       // <Card  name={item.name} url={item.photo} description={item.description} id={item.id}/>
       <Card 
       content={item.content}
       callToActionText={'Take me for a walk'}
       imageUrl={item.dog.photo}
       title={item.title}
       date={item.date_from}
       day="TUESDAY"
       distance="1.8 km"
       time="7:00 - 21:00"
       onPress={onPress}/>
    );

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <ExploreFilter distance={distance} setDistance={setDistance} selectedIndexes={selectedIndexes}
                               setSelectedIndexes={setSelectedIndexes} multiple={true} categories={categories}/>
            </Provider>

            {/* <ScrollView>
                <Card
                    content={content}
                    callToActionText={'Take me for a walk'}
                    imageUrl={imageUrl}
                    title="Smol Husky Woofer"
                    date=" 6.4.2020"
                    day="TUESDAY"
                    distance="1.8 km"
                    time="7:00 - 21:00"
                    onPress={onPress}
                />
                <Card
                    content={content}
                    callToActionText={'Take me for a walk'}
                    imageUrl={imageUrl}
                    title="Very Good Boy"
                    date=" 6.4.2020"
                    day="TUESDAY"
                    distance="1.8 km"
                    time="7:00 - 21:00"
                    onPress={onPress}
                />
                <Card
                    content={content}
                    callToActionText={'Take me for a walk'}
                    imageUrl={imageUrl}
                    title="Snoop Dog"
                    date=" 6.4.2020"
                    day="TUESDAY"
                    distance="1.8 km"
                    time="7:00 - 21:00"
                    onPress={onPress}
                />
            </ScrollView> */}

            <FlatList
                data={listings}
                renderItem={renderItem}
                keyExtractor={(item : any) => item.id}
                style={[{paddingTop: 20}]}
            />
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
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
