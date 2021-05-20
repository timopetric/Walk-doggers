import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"
import { withTheme } from 'react-native-elements'
import {GRAY_3, GREEN, ORANGE, RED} from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const CarouselCardItem = ({ item, index, inChat }) => {
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
          source={{ uri: item.imgUrl }}
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
          {item.appliedListing && item.accText && <View style={[styles.accView, {backgroundColor: GREEN}]}>
              <Text style={styles.accText}>ACCEPTED</Text>
          </View> }

          {/* prijavljen oglas, ki ni potrjen*/}
          {item.appliedListing &&  item.reqText && <View style={[styles.accView, {backgroundColor: ORANGE}]}>
              <Text style={styles.accText}>REQUESTED</Text>
          </View> }

          {item.appliedListing &&  item.reqText && <View style={[styles.btnReq, {backgroundColor: RED}]}>
            <TouchableOpacity>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>}

          {/* soft apply */}
          {item.appliedListing &&  item.reqBtn && <View style={[styles.btnReq, {backgroundColor: GREEN}]}>
            <TouchableOpacity>
              <Text style={styles.btnText}>Request</Text>
            </TouchableOpacity>
          </View>}

          {/* objavljen oglas, ki še ni potrjen*/}
          {item.inChat && !item.appliedListing && item.accBtn && <View style={[styles.btnReq, {backgroundColor: GREEN}]}>
            <TouchableOpacity>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          </View>}
          {item.inChat && !item.appliedListing &&  item.accBtn && <View style={[styles.accView, {backgroundColor: "white"}]}>
              <Text style={[styles.accText, {color: ORANGE}]}>REQUESTED</Text>
          </View> }

          {/* objavljen oglas, ki je potrjen*/}
          {!item.appliedListing && !item.accBtn && <View style={[styles.accView, {backgroundColor: "white"}]}>
              <Text style={[styles.accText, {color: GREEN}]}>ARRANGED</Text>
          </View> }
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
    fontWeight:"600",
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
    fontSize: 10,
    padding: 5,
  },
  allMessages: {
    height: 55,
    alignItems: "center"
  },
  h1: {
    fontFamily: "roboto-500",
    fontSize: 18,
    top:-5
  },
  h2: {
    fontFamily: "roboto-300",
    fontSize: 14
  }
});

export default CarouselCardItem
