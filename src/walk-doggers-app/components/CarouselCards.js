import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

const data = [
  {
    title: "Very good boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/11/200/300"
  },
  {
    title: "Very bad boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/10/200/300"
  },
  {
    title: "Very bad boy",
    date: "Tuesday",
    time: "14:00",
    imgUrl: "https://picsum.photos/id/10/200/300"
  }
]

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)


  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length>6?6:data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 5,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          marginTop: -9,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
          padding: 5
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        containerStyle={{paddingVertical: 0, marginTop: -32, paddingBottom: 10}}

      />
    </View>

  )
}



export default CarouselCards