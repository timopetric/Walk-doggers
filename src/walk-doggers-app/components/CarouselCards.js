import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import {GRAY_0, GRAY_1, PRIMARY} from "../constants/Colors";

const data = [
  {
    title: "Very good boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/11/200/300",
    appliedListing: true,
    reqBtn: true,
    accText: false,
    reqText: false
  },
  {
    title: "Very bad boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/10/200/300",
    appliedListing: true,
    reqBtn: false,
    accText: false,
    reqText: true
  },
  {
    title: "Very bad boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/10/200/300",
    appliedListing: true,
    reqBtn: false,
    accText: true,
    reqText: false
  },
  {
    title: "Very bad boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/10/200/300",
    appliedListing: false, 
    accBtn: true
  },
  {
    title: "Very bad boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/10/200/300",
    appliedListing: false, 
    accBtn: false
  }
]

const CarouselCards = (props) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  data.forEach(function(arrayItem) {
    arrayItem.inChat = props.inChat
  })

  return (
    <View>
      <Carousel
        // layout="tinder"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        // useScrollView={true}

      />
      <Pagination
        dotsLength={data.length>6?6:data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 10,
          backgroundColor: PRIMARY,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        inactiveDotStyle={{
          backgroundColor: GRAY_1
        }}
        tappableDots={true}
        containerStyle={{paddingVertical: 0, marginTop: -40, paddingBottom: 20}}

      />
    </View>

  )
}



export default CarouselCards
