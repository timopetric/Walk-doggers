import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"
import { withTheme } from 'react-native-elements'
import  {GREEN} from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <View style={styles.row}> 
        <Image
          source={{ uri: item.imgUrl }}
          style={styles.image}
        />
        <View style={styles.column}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.row, {paddingTop: 5}]}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={{fontFamily: "roboto", color: "black", fontSize: 15}}> walk at </Text>
            <Text style={styles.date}>{item.time}</Text>
          </View>
          <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.btnText}>Request</Text>
                    </View>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    width: ITEM_WIDTH,
    padding: 15,
    marginBottom: 5,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  image: {
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: "center"
  },
  title: {
    color: "#222",
    fontSize: 22,
    fontFamily: "roboto-500"
  },
  date: {
    color: "#222",
    fontSize: 15,
    fontFamily: "roboto-500"
  },
  column: {
    paddingLeft: 20,
    flex: 1
  },
  row: {
    flexDirection: "row",
    alignContent: "center"
  },
  
  center: {
    alignItems: 'center'
  },
  button: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "flex-end",
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        backgroundColor: GREEN
    },
    btnText: {
        fontFamily: "red-hat-text-500",
        color: "white",
        fontSize: 12,
        padding: 5,
    }
});

export default CarouselCardItem