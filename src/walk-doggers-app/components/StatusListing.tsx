import React from "react";
import {Text} from "react-native";
import {GRAY_2, ORANGE, GREEN, RED} from '../constants/Colors';

export default function statusListing (props: any) {
    const {listing, style, application} = props
    var text = ""
    var color
    const date_now = new Date()

    if (listing) {
        // render status for my listing
        const date_from = new Date(listing.date_from);
        const date_to = new Date(listing.date_to);
        /*
        console.log("date_now")
        console.log(date_now)
        console.log("date_from")
        console.log(date_from)
        console.log("date_to")
        console.log(date_to)
        console.log(date_now > date_from)
        */
        if (listing.confirmed_application == null && date_now < date_from) {
            //LISTED - noben sprehajalec se ni potrjen
            text = "LISTED"
            color = GRAY_2
        }else if(listing.confirmed_application != null && date_now < date_to) {
            //ARRANGED - sprehajalec potrjen
            text = "ARRANGED"
            color = GREEN
        } else if(listing.confirmed_application != null && date_now > date_to) {
            text = "COMPLETED"
            color = ORANGE
        } else {
            text = "EXPIRED"
            color = RED
        }
    } else {
    
        const date_from = new Date(application.listing.date_from);
        const date_to = new Date(application.listing.date_to);
        /*
        console.log(application)
        console.log("date_now")
        console.log(date_now)
        console.log("date_from")
        console.log(date_from)
        console.log("date_to")
        console.log(date_to)
        */
        //render status for applied listing
        //PENDING - cakanje na potrditev
        if ((application.status == "normal" || application.status == "soft") && date_now < date_to) {
            text = "PENDING"
            color = GRAY_2
        //ACCEPTED - oglas potrjen 
        } else if (application.status == "confirmed" && date_now < date_to) {
            text = "ACCEPTED"
            color = GREEN
        //REJECTED - oglas 
        } else if (application.status == "rejected") {
            text = "REJECTED"
            color = RED
        //COMPLETED - oglas je bil potrjen in je potekel
        } else if (application.status == "confirmed" && date_now > date_to) {
            text = "COMPLETED"
            color = GRAY_2
        //EXPIRED - oglas ni bil potrjen in je potekel
        } else if (application.status != "confirmed" && date_now) {
          text = "EXPIRED";
          color = RED;
        }
    }
    

    return (
        <Text style={[style, {color: color}]}>{text}</Text>
    )
}