import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ListingCard from "../../components/ListingCard";
import AuthContext from "../../navigation/AuthContext";
import { useEffect, useState, useContext } from "react";
import { format } from "date-fns";



export function Applied(props) {
  const { getJwt } = useContext(AuthContext);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    if (props.isFocused) {
      getApplied();
    }
  }, [props.isFocused]);

  const getApplied = () => {
    fetch(process.env.BASE_API_URL + "/applications/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJwt(),
      },
    }).then(async (response) => {
      let json = await response.json();
      console.log(json);
      setApplied(json);
    });
  };

  function renderItem({ item }) {
    item = item.listing
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

    //PENDING - cakanje na potrditev
        //message owner
    //ACCEPTED - oglas potrjen 
        //message  owner
    //REJECTED - oglas 
    //COMPLETED - oglas je bil potrjen in je potekel
        //message owner
        //leave feedback
    //EXPIRED - oglas ni bil potrjen in je potekel
        //message owner

    return (
      <ListingCard
        status="accepted"
        location={item.location_text}
        title={item.title}
        descr={item.description}
        urlImage={item.dog.photo}
        date={date_item}
        dateDay={daysOfWeek[date_from.getDay()]}
        time={hours}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={applied}
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
  