import {Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, FlatList} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import {useEffect, useState, useContext} from "react";
import AuthContext from "../../navigation/AuthContext";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
  miniDogCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",

    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 10,
    fontFamily: "roboto-500",
  },
  miniImage: {
    width: imgWidth / 4,
    height: imgWidth / 4,
    marginRight: 20,
    flex: 1,
  },
  textContainer: {
    flex: 4,
  },
  editContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    flex: 1,
  },
  editText: {
    color: BLUE,
    textTransform: "uppercase",
    alignContent: "flex-end",
    paddingBottom: 10,
    fontFamily: "red-hat-text-500",
  },
  description: {
    fontFamily: "red-hat-text",
  },
  scroller: {
    backgroundColor: GRAY_0,
    paddingTop: 20
  },
});

type Dog = {
    description: string;
    id: string,
    name: string;
    photo: string;
    size_category: number;
}



export default function MyDogsScreen() {
    
    const { getJwt } = useContext(AuthContext);

    const [dogs, setDogs] = useState<Object[]>([{name: "string", id: "d",
        description: "Dd",
        size_category: 1,
        photo: "dd"}])

    const renderItem = ({ item }) => (
        <MiniDogCard name={item.name} url={item.photo} description={item.description} id={item.id}/>
      );

      useEffect(() => {
        fetch(process.env.BASE_API_URL + '/dogs/', {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + getJwt()
            },
        }).then(async response => {
            let json = await response.json();
            console.log(json)
            setDogs(json)
        })
        }, [])
    
    return (
        <FlatList
            data={dogs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={[{paddingTop: 20}]}
        />
    );
}



function MiniDogCard(props: any) {
    return (
        <View style={styles.miniDogCard}>
            <Image
                style={styles.miniImage}
                source={{uri: props.url}}
            />

            <View style={{justifyContent: 'flex-end', flexDirection: 'row', flex: 2}}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>{props.name}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                </View>

                <View style={styles.editContainer}>
                    <Pressable onPress={() => alert('TODO implement')}>
                        <Text style={styles.editText}>Edit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
