import {Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, PRIMARY, tintColorLight} from "../../constants/Colors";
import { Input } from 'react-native-elements';
import {Entypo} from "@expo/vector-icons";
import ButtonCustom from "../../components/ButtonCustom"


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


export default function MyDogsScreen() {
    return (
        <ScrollView style={styles.scroller}>
            <MiniDogCard name={'Buddy'} de/>
            <MiniDogCard name={'Snoop Dog'}/>
        </ScrollView>
    );
}

function MiniDogCard(props: any) {
    return (
        <View style={styles.miniDogCard}>
            <Image
                style={styles.miniImage}
                source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'}}
            />

            <View style={{justifyContent: 'flex-end', flexDirection: 'row', flex: 2}}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>{props.name}</Text>
                    <Text style={styles.description}>Golden retriever</Text>
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
