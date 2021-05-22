import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from 'react-native';
import {AntDesign, Ionicons, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import {Card, Rating} from "react-native-elements";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../navigation/AuthContext";
import {DARK, GRAY_0, GRAY_00, GRAY_3, LIGHT_BG, RED, YELLOW} from "../../constants/Colors";
import {useIsFocused} from "@react-navigation/native";
// import { AuthContext } from '../../navigation/Providers/AuthProvider';


const SettingsItem = ({text, icon, color, last, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.settingsItemContainer}>
            <View style={[styles.settingsItem, {borderBottomWidth: last === true ? 0 : 1}]}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: 45, justifyContent: "center"}}>
                        {icon}
                    </View>
                    <Text style={{color: color, fontSize: 17}}>{text}</Text>
                </View>
                <View style={{width: 24}}>
                    {last || <Ionicons name={'chevron-forward'} size={24} color={color}/>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function TabSettings({navigation}: any) {
    const isFocused = useIsFocused();

    const {signOut, getJwt, isReporter} = useContext(AuthContext);
    console.log(getJwt());
    const showBecomeReporter = !isReporter();
    const [rating, setRating] = useState(0.0)

    useEffect(() => {
        if (isFocused) {
            fetch(process.env.BASE_API_URL + '/profile', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getJwt()
                },
            }).then(async response => {
                let json = await response.json();
                console.log(json)
                setRating(json.rating)
            })
        }
    }, [isFocused])
    return (
        <View style={styles.container}>
            <View>

                <SettingsItem
                    last={false}
                    text={"Profile"} color={DARK}
                    icon={<Ionicons color={DARK} name={'person-outline'} size={25}/>}
                    onPress={() => navigation.navigate('EditProfileScreen')}
                />
                <SettingsItem
                    last={false}
                    text={"My Dogs"} color={DARK}
                    icon={<FontAwesome5 size={25} name="dog" color={DARK}/>}
                    onPress={() => navigation.navigate('MyDogsScreen')}
                />
                {showBecomeReporter &&
                <SettingsItem
                    last={false}
                    text={"Become a reporter"} color={DARK}
                    icon={<Ionicons color={DARK} name={'newspaper-outline'} size={25}/>}
                    onPress={() => navigation.navigate('BecomeAReporterScreen')}
                />
                }
                <SettingsItem
                    text={"Logout"} color={RED}
                    icon={<Ionicons color={RED} name={'log-out-outline'} size={25}/>}
                    onPress={() => signOut()}
                    last={true}
                />
            </View>
            <View style={{alignItems: "center", height: 100}}>
                <Text style={styles.myRating}>MY RATING</Text>
                <Rating
                    type='custom'
                    ratingCount={5}
                    startingValue={rating}
                    imageSize={40}
                    readonly
                    ratingBackgroundColor={GRAY_0}
                    ratingColor={YELLOW}
                    tintColor={LIGHT_BG}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    myRating: {
        fontFamily: 'red-hat-text-500',
        color: 'black',
        fontSize: 13,
        marginBottom: 12,
    },
    settingsItemContainer: {
        paddingHorizontal: 30, flexDirection: "row", width: 800, maxWidth: "100%"
    },
    settingsItem: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        borderBottomColor: GRAY_0,
        borderBottomWidth: 1,
        height: 66,
        justifyContent: "space-between"
    },
    container:
        {
            flex: 1,
            alignItems: 'center',
            justifyContent: "space-between",
            backgroundColor: LIGHT_BG,
        },

});
