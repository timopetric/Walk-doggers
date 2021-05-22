import React, {useEffect, useContext, useState} from 'react'
import {View, useWindowDimensions} from "react-native"
import Carousel, {Pagination} from 'react-native-snap-carousel'
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem'
import {GRAY_0, GRAY_1, GRAY_2, PRIMARY} from "../constants/Colors";
import AuthContext from "../navigation/AuthContext";
import {format} from "date-fns";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const data1 = [
    {
        allMessages: true
    },
    /* application soft apply*/
    {
        title: "Very good boy",
        date: "Tuesday",
        time: "14:00",
        imgUrl: "https://picsum.photos/id/11/200/300",
        application: true,
        reqBtn: true,
        accText: false,
        reqText: false
    },
    /*application, ki se ni potrjen*/
    {
        title: "Very bad boy",
        date: "Tuesday",
        time: "14:00",
        imgUrl: "https://picsum.photos/id/10/200/300",
        application: true,
        reqBtn: false,
        accText: false,
        reqText: true
    },
    /*application, ki je potrjen*/
    {
        title: "Very bad boy",
        date: "Tuesday",
        time: "14:00",
        imgUrl: "https://picsum.photos/id/10/200/300",
        application: true,
        reqBtn: false,
        accText: true,
        reqText: false
    },
    /*listing, ki se ni potrjen*/
    {
        title: "Very bad boy",
        date: "Tuesday",
        time: "14:00",
        imgUrl: "https://picsum.photos/id/10/200/300",
        accBtn: true
    },
    /*listing, ki je potrjen*/
    {
        title: "Very bad boy",
        date: "Tuesday",
        time: "14:00",
        imgUrl: "https://picsum.photos/id/10/200/300",
    }
]

const CarouselCards = (props) => {
    const {filterUsers} = props;
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)
    const {getJwt} = useContext(AuthContext);
    const [data, setData] = useState([])

    const [listings, setListings] = useState([])
    const [applications, setApplications] = useState([])
    const [applicationsFiltered, setApplicationsFiltered] = useState([])
    const [listingsFiltered, setListingFiltered] = useState([])
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

    const onSnap = index => {
        setIndex(index);
        console.log(index);
        if (data[index]?.allMessages === true) {
            filterUsers([], false)
        } else {
            filterUsers(data[index]?.user_ids, true)
        }
    }

    useEffect(() => {
        if (props.inChat) {
            setData([...applicationsFiltered, ...listingsFiltered])
        } else {
            setData([{allMessages: true}, ...applicationsFiltered, ...listingsFiltered])
        }

    }, [applicationsFiltered, listingsFiltered])

    useEffect(() => {
        fetchListingsApplications()
    }, [])

    useEffect(() => {
        const date_now = new Date()
        const notRejected = applications.filter(item => (date_now < new Date(item.listing.date_to.toString()) && item.status !== "rejected"))

        var applicationsFormatted = []
        for (const item of notRejected) {
            const date_from = new Date(item.listing.date_from.toString());
            const date_to = new Date(item.listing.date_to.toString());
            const hours = `${format(date_from, "HH:mm")} - ${format(date_to, "HH:mm")}`;
            let obj = {
                title: item.listing.title,
                date: daysOfWeek[date_from.getDay()],
                time: hours,
                imgUrl: item.listing.dog.photo,
                inChat: props.inChat,
                application: true,
                user_ids: [item.listing.author_id]
            }
            if (item.status === "soft") {
                obj.reqBtn = true
            } else if (item.status === "normal") {
                obj.reqText = true
            } else if (item.status === "confirmed") {
                obj.accText = true
            }
            applicationsFormatted.push(obj)
        }
        setApplicationsFiltered(applicationsFormatted);
    }, [applications])

    useEffect(() => {
        const date_now = new Date()
        const list = listings.filter(item => (date_now < new Date(item.date_to.toString())))

        var listingsFormatted = []
        for (const item of list) {
            const date_from = new Date(item.date_from.toString());
            const date_to = new Date(item.date_to.toString());
            const hours = `${format(date_from, "HH:mm")} - ${format(date_to, "HH:mm")}`;
            const ids = item.applications.map(application => {
                return application?.applied_user?.id
            });
            let obj = {
                title: item.title,
                date: daysOfWeek[date_from.getDay()],
                time: hours,
                imgUrl: item.dog.photo,
                inChat: props.inChat,
                user_ids: ids

            }

            if (item.confirmed_application == null) {
                obj.accBtn = true
            }
            listingsFormatted.push(obj)
        }
        setListingFiltered(listingsFormatted)

    }, [listings])

    const fetchListingsApplications = () => {
        const jwt = getJwt();
        Promise.all([
            fetch(process.env.BASE_API_URL + '/listings/', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                },
            }),
            fetch(process.env.BASE_API_URL + '/applications/', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt
                },
            })
        ]).then(async ([data1, data2]) => {
            //.log(listings)
            const listingsData = await data1.json()
            const applicationsData = await data2.json()

            // console.log(applicationsData)
            setApplications(applicationsData)
            setListings(listingsData)


        })
    }


    const windowWidth = useWindowDimensions().width;

    return (
        <View>
            <Carousel
                // layout="tinder"
                layoutCardOffset={0}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                sliderWidth={windowWidth}
                itemWidth={windowWidth - 40}
                onSnapToItem={(index) => onSnap(index)}
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
