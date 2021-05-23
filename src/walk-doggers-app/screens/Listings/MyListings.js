import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListingCard from "../../components/ListingCard";
import { useIsFocused } from "@react-navigation/native";
import AuthContext from "../../navigation/AuthContext";
import { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import {BASE_API_URL} from "../../localConstants";
import {LIGHT_BG2} from "../../constants/Colors";

export function MyListings(props) {
  const { getJwt } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    if (props.isFocused) {
      getMyListings();
    }
  }, [props.isFocused]);

  const getMyListings = () => {
    fetch(BASE_API_URL + "/listings/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
    }).then(async (response) => {
      if (response.ok){
          let json = await response.json();
        setMyListings(json);
      }
      //console.log(json);
    });
  };

  function renderItem({ item }) {
    var daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date_from = new Date(item.date_from.toString());
    const date_to = new Date(item.date_to.toString());
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    //@ts-ignore
    const date_item = date_from.toLocaleDateString("de-DE", options);
    const hours = `${format(date_from, "HH:mm")} - ${format(date_to, "HH:mm")}`;

    //LISTED - noben sprehajalec se ni potrjen
        //applied users
    //ARRANGED - sprehajalec potrjen
        //applied users
    //COMPLETED - oglas potekel in je imel potrjenega sprehajalca
        //applied users in feedback
    //EXPIRED - oglas potekel in ni imel potrjenega sprehajalca

    return (
      <ListingCard
        status="accepted"
        location={item.location_text}
        title={item.title}
        descr={item.description}
        date={date_item}
        urlImage={item.dog.photo}
        dateDay={daysOfWeek[date_from.getDay()]}
        time={hours}
        numOfApplied={item.applications.filter((application) => application.status != "soft").length}
        listing={item}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={myListings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_BG2
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
});
