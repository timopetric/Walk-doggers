import React from "react";
import {GRAY_2, ORANGE, GREEN, RED, PINK} from '../constants/Colors';
import ButtonCustom from "../components/ButtonCustom";


function onPressLeaveFeedback (props: any) {
  
}

export default function leaveFeedback(props: any) {
  const { listing, style, application } = props;
  var text;
  var color;
  const date_now = new Date();

  if (listing) {
    // render status for my listing
    console.log(listing);
    const date_from = new Date(listing.date_from);
    const date_to = new Date(listing.date_to);
    if (listing.confirmed_application != null && date_now > date_to) {
      text = "Leave feedback";
      color = "pink";
    }
  } else {
    const date_from = new Date(application.listing.date_from);
    const date_to = new Date(application.listing.date_to);
    if (true/*application.status == "confirmed" && date_now > date_to*/) {
      text = "Leave feedback";
      color = "pink";
    }
  }

  if (text) {
    return <ButtonCustom text={text} color={color} style={{ flex: 1 }} onPress={() => onPressLeaveFeedback(props)} />;
  }
  return null;
}
