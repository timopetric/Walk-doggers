import React, {useContext} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"
import {withTheme} from 'react-native-elements'
import {GRAY_3, GREEN, ORANGE, RED} from '../constants/Colors';
import {BASE_API_URL} from "../localConstants";
import AuthContext from "../navigation/AuthContext";

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const CarouselListingItem = ({item, index, getJwt, refresh, user}) => {
    // console.log(item);
    const jwt = getJwt();
    // console.log(jwt)
    // const {getJwt} = useContext(AuthContext);

    const applyToListing = () => {
        let reqBody = {"listing_id": item?.listingId}
        const jwt = getJwt();
        // console.log(reqBody);
        // console.log(jwt);
        fetch(BASE_API_URL + '/applications/', {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(reqBody)
        }).then(async response => {
            let json = await response.json();
            // console.log(json)
            if (response.ok) {
                alert("Applied!");
                refresh();
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const cancelApplication = () => {
        let reqBody = {"listing_id": item?.listingId}
        const jwt = getJwt();
        // console.log(reqBody);
        // console.log(jwt);
        fetch(BASE_API_URL + '/applications/' + item?.applicationId, {
            method: "DELETE",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(reqBody)
        }).then(async response => {
            let json = await response.json();
            // console.log(json)
            if (response.ok) {
                alert("Your application is cancelled!");
                refresh();
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const acceptApplication = () => {
        const application = item.applications.find(app => app?.applied_user?.id === user.id)
        let reqBody = {"status": "confirmed"}
        const jwt = getJwt();

        fetch(`${BASE_API_URL}/applications/${application.id}`, {
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(reqBody)
        }).then(async response => {
            let json = await response.json();
            console.log(json)
            if (response.ok) {
                alert("Walk is arranged");
                refresh();
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const showAccept = () => {
        if (item?.applications) {
            const application = item.applications.find(app => app?.applied_user?.id === user.id)
            return (application.status === 'normal')
        }
        return false;
    }


    return (
        <View style={styles.container} key={index}>

            {item.allMessages &&
            <View style={styles.allMessages}>
                <Text style={styles.h1}>All Messages</Text>
                <Text style={styles.h2}>Swipe to filter by active listings</Text>
            </View>
            }


            {!item.allMessages &&
            <View style={styles.row}>
                <Image
                    source={{uri: item.imgUrl}}
                    style={styles.image}
                />
                <View style={styles.column}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={[styles.row, {paddingTop: 3}]}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={{fontFamily: "roboto", color: "black", fontSize: 15}}> walk at </Text>
                        <Text style={styles.date}>{item.time}</Text>
                    </View>
                    {/* prijavljen oglas, ki je potrjen*/}
                    {item.application && item.accText && <View style={[styles.accView, {backgroundColor: "white"}]}>
                        <Text style={[styles.accText, {color: GREEN}]}>ACCEPTED</Text>
                    </View>}

                    {/* prijavljen oglas, ki ni potrjen*/}
                    {item.application && item.reqText && <View style={[styles.accView, {backgroundColor: "white"}]}>
                        <Text style={[styles.accText, {color: ORANGE}]}>APPLIED</Text>
                    </View>}

                    {item.application && item.reqText && <View style={[styles.btnReq, {backgroundColor: RED}]}>
                        <TouchableOpacity onPress={cancelApplication}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>}

                    {/* soft apply */}
                    {item.application && item.reqBtn && <View style={[styles.btnReq, {backgroundColor: GREEN}]}>
                        <TouchableOpacity onPress={applyToListing}>
                            <Text style={styles.btnText}>Request</Text>
                        </TouchableOpacity>
                    </View>}

                    {/* objavljen oglas, ki še ni potrjen*/}
                    {item.inChat && !item.application && item.accBtn && showAccept() &&
                    <View style={[styles.btnReq, {backgroundColor: GREEN}]}>
                        <TouchableOpacity onPress={acceptApplication}>
                            <Text style={styles.btnText}>Accept</Text>
                        </TouchableOpacity>
                    </View>}
                    {item.inChat && !item.application && item.accBtn && showAccept() &&
                    <View style={[styles.accView, {backgroundColor: "white"}]}>
                        <Text style={[styles.accText, {color: ORANGE}]}>REQUESTED</Text>
                    </View>}

                    {/* objavljen oglas, ki je potrjen*/}
                    {!item.application && !item.accBtn && <View style={[styles.accView, {backgroundColor: "white"}]}>
                        <Text style={[styles.accText, {color: GREEN}]}>ARRANGED</Text>
                    </View>}
                </View>
            </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 20,
        // width: ITEM_WIDTH,
        padding: 15,
        // paddingBottom: 20,
        marginBottom: 25,
        marginTop: 20,
        shadowColor: GRAY_3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1,
    },
    image: {
        borderRadius: 35,
        width: 55,
        height: 55,
        justifyContent: "center",
    },
    title: {
        color: "#222",
        fontSize: 20,
        fontFamily: "roboto-500",
    },
    date: {
        color: "#222",
        fontSize: 15,
        fontFamily: "roboto-500",
    },
    column: {
        paddingLeft: 20,
        flex: 1,
    },
    row: {
        flexDirection: "row",
        alignContent: "center",
    },

    center: {
        alignItems: "center",
    },
    btnReq: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "flex-end",
        borderRadius: 5,
        right: 5,
        top: 55,
        zIndex: 2,
        shadowColor: GRAY_3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 1,
    },
    btnText: {
        // fontFamily: "red-hat-text",
        fontWeight: "600",
        color: "white",
        fontSize: 12,
        paddingVertical: 6,
        paddingHorizontal: 20,
    },
    accView: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "flex-end",
        borderRadius: 5,
        padding: 0,
        right: 5,
        top: 0,
        zIndex: 2,
    },
    accText: {
        // fontFamily: "roboto",
        fontWeight: "600",
        color: "white",
        fontSize: 11,
        padding: 4,
    },
    allMessages: {
        height: 55,
        alignItems: "center"
    },
    h1: {
        fontFamily: "roboto-500",
        fontSize: 18,
        top: -5
    },
    h2: {
        fontFamily: "roboto-300",
        fontSize: 14
    }
});

export default CarouselListingItem
