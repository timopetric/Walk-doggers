import {Image, ScrollView} from "react-native";

import React, {useContext, useEffect, useState} from "react";
import {GRAY_0, GRAY_00, GRAY_1, GRAY_2, GRAY_3, PRIMARY} from "../constants/Colors";

import {
    StyleSheet,
    View,
    Text, TextInput, TouchableOpacity,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useIsFocused} from "@react-navigation/native";
import AuthContext from "../navigation/AuthContext";
import {useNavigation} from '@react-navigation/native';

const DogCircle = ({dog, selected, onPress, plusIcon}: any) => {
    return (
        <TouchableOpacity style={[styles.circleContainter, selected === true && {backgroundColor: PRIMARY}]}
                          onPress={onPress}>
            <View style={styles.innerCircle}>
                {plusIcon === true ? <Ionicons size={30} name="add" style={{width: 28, height: 30}}
                                               color={GRAY_3}/> :
                    <Image
                        resizeMode={'cover'}
                        style={styles.circleImage}
                        source={{uri: dog.photo}}
                    />}

            </View>
        </TouchableOpacity>
    )
}


const DogSelect = ({onSelectId, navigation}: any) => {
    const isFocused = useIsFocused();
    // const navigation = useNavigation();
    const {getJwt} = useContext(AuthContext);

    // const dogs = [{id: 1}, {id: 2}, {id: 3},]
    const [selectedDogId, setSelectedDogId] = useState({})
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        if (isFocused) {
            fetch(process.env.BASE_API_URL + '/dogs/', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getJwt()
                },
            }).then(async response => {
                if (response.ok) {
                    let json = await response.json();
                    setDogs(json)
                }
            })
        }
    }, [isFocused]);

    useEffect(() => {
        onSelectId(selectedDogId);
    }, [selectedDogId]);

    const optionsRender = dogs.map((dog, index) => {
        return (<DogCircle key={index} selected={dog?.id === selectedDogId} onPress={() => setSelectedDogId(dog?.id)}
                           dog={dog}/>)
    })

    return (
        <ScrollView style={styles.container} horizontal>
            {optionsRender}
            <DogCircle plusIcon onPress={() => navigation.navigate('Listings', {screen: 'NewDogScreenListings'})}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    circleContainter: {
        borderRadius: 100, height: 70, width: 70, marginRight: 5
    },
    innerCircle: {
        backgroundColor: GRAY_0,
        flex: 1,
        margin: 4,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.10,
        elevation: 1,
    },
    circleImage: {
        borderRadius: 200,
        height: "100%",
        width: "100%",
        flex: 1,
    },
    container: {
        // marginBottom: 12,
        padding: 5,
        flexDirection: "row"
    },
    label: {
        fontFamily: 'red-hat-text-500',
        color: 'black',
        fontSize: 13,
        marginBottom: 4,
    },
    input: {
        height: 48,
        fontSize: 15,
        backgroundColor: GRAY_00,
        borderRadius: 1,
        paddingHorizontal: 10,
    },

});
export default DogSelect;
