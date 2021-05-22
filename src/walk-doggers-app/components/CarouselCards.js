import React from 'react'
import {View, useWindowDimensions} from "react-native"
import Carousel, {Pagination} from 'react-native-snap-carousel'
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem'
import {GRAY_0, GRAY_1, GRAY_2, PRIMARY} from "../constants/Colors";

const data = [
    {
        allMessages: true
    },
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

    // TODO
    // - pridobi vse moje listinge
    // - prodobi vse moje applications
    // - ce je props userId (pomeni, da je prikazan v chatu z urserjev) prikazi:
    //      - vse MOJE listinge, kjer listing.applications vsebujejo userID
    //      - vse listinge MOJIH prijav, kjer je application.listing.author_id === userID
    // - sicer:
    //      - all messages
    //      - vse MOJE listinge, kjer datum konca se ni bil
    //      - vse MOJE applications, kjer application.listing.datum se ni bil in application.status ni rejected
    //
    //      - ko slidas na item, ki je listing, vrni Id-je userjev vseh prijav
    //      - ko slidas na item, ki je application, vrni application.listing.author
    //
    //
    //

    data.forEach(function (arrayItem) {
        arrayItem.inChat = props.inChat
    })
    const windowWidth = useWindowDimensions().width;

    return (
        <View>
            <Carousel
                // layout="tinder"
                layoutCardOffset={0}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                sliderWidth={windowWidth}
                itemWidth={windowWidth - 40}
                onSnapToItem={(index) => setIndex(index)}
                // useScrollView={true}

            />
            <Pagination
                dotsLength={data.length > 6 ? 6 : data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 10,
                    backgroundColor: PRIMARY,
                }}
                dotContainerStyle={{marginHorizontal: 3}}
                inactiveDotOpacity={0.7}
                inactiveDotScale={1}
                inactiveDotStyle={{
                    backgroundColor: GRAY_1,
                }}
                tappableDots={true}
                containerStyle={{paddingVertical: 0, marginTop: -36}}

            />
        </View>

    )
}


export default CarouselCards
