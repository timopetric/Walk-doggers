
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import {Image, StyleSheet, View, Text, Dimensions, TouchableOpacity} from "react-native";
import { Card } from "react-native-elements/dist/card/Card";
import {categories} from "../constants/Values";
// import StarRating from 'react-native-star-rating'
import {GRAY_STAR, YELLOW} from "../constants/Colors";

interface IAboutMeCardProps {
    image?: string;
    name?: string;
    descr?: string;
    isDog?: boolean;
    value: number;
}

class AboutMeCard extends React.Component<IAboutMeCardProps> {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            style={styles.miniImage}
            source={{
              uri: this.props.image,
            }}
          />
          <View style={styles.col}>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.desc}>{this.props.descr}</Text>
          </View>
          <View style={styles.stars}>
            <View style={styles.weightRow}>
              {this.props.isDog && (
                <FontAwesome5
                  name="weight-hanging"
                  size={13}
                  color="black"
                  style={styles.icon}
                />
              )}

              {this.props.isDog && (
                <Text style={styles.value}>
                  {categories[this.props.value]} kg
                </Text>
              )}
            </View>

          {/*  {!this.props.isDog && (*/}
          {/*    <StarRating*/}
          {/*      disabled={false}*/}
          {/*      rating={this.props.value}*/}
          {/*      maxStars={5}*/}
          {/*      fullStarColor={YELLOW}*/}
          {/*      emptyStarColor={GRAY_STAR}*/}
          {/*      emptyStar={"ios-star"}*/}
          {/*      fullStar={"ios-star"}*/}
          {/*      halfStar={"ios-star-half"}*/}
          {/*      iconSet={"Ionicons"}*/}
          {/*      starSize={20}*/}
          {/*    />*/}
          {/*  )}*/}
          </View>
        </View>
      </View>
    );
  }
}

export default AboutMeCard;

const dimensions = Dimensions.get("window");
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    margin: 20
  },

  icon: {
    marginTop: 5,
    paddingRight: 5
  },
  stars: {
    alignItems: "flex-end",
    flex: 1
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    marginTop: 5
  },
  col: {
    flex: 0.8,
    marginLeft:0
  },
  name: {
    fontFamily: "roboto-500",
    fontSize: 16
  },
  desc: {
    paddingTop: 5,
    fontFamily: "roboto"
  },
  value: {
    fontFamily: "roboto",
    color: "#676767",
    fontSize: 16
    },
  miniImage: {
    width: imgWidth / 6,
    height: imgWidth / 6,
    borderRadius: imgWidth / 6,
    marginRight: 20
  },
  weightRow: {
    flexDirection: "row"
  }
});
