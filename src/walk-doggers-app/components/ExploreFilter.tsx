import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {store, pickDistanceFilter, pickSizeFilter} from "../redux/store";
import {Card, Slider} from "react-native-elements";
import {categories, maxDistance} from "../constants/Values";
import {GRAY_2, PRIMARY, PINKISH_WHITE, PRIMARY_DARK, GRAY_1, GRAY_3, GRAY_0, BLUE} from '../constants/Colors';
import SizeSelector from "./SizeSelector";
import Collapsible from "react-native-collapsible";


interface IExploreFilterProps {
    showFilter?: boolean;
}

const ExploreFilter = (props: any) => {
    const {showFilter, distance, setDistance, selectedIndexes, setSelectedIndexes, multiple, categories} = props
    return (
        <Collapsible collapsed={!showFilter} style={{flex: 1}} duration={300}>
            <View style={{padding: 20, paddingBottom: 8, flex: 1}}>
                <Text style={[styles.filterParamText, {paddingBottom: 10}]}>Size</Text>
                <SizeSelector categories={categories} selectedIndexes={selectedIndexes}
                              setSelectedIndexes={setSelectedIndexes} multiple={multiple}/>

                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={styles.filterParamText}>Distance</Text>
                    <View style={styles.selectedDistanceText}>
                        {/*<Text style={{fontSize: 16, fontWeight: "400"}}>{store.getState().selectedDistance} km</Text>*/}
                        <Text style={{fontSize: 16, fontWeight: "400"}}>{distance} km</Text>
                    </View>
                </View>

                <Slider
                    value={distance / maxDistance}
                    thumbTintColor='white'
                    thumbStyle={styles.thumbStyle}
                    minimumTrackTintColor={BLUE}
                    onSlidingComplete={value => setDistance(Math.round(value * maxDistance))}
                />
                <View style={styles.distanceRange}>
                    <Text style={{flex: 1, fontWeight: "bold"}}>0 km</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: "bold"}}>200 km</Text>
                    </View>

                </View>
            </View>
        </Collapsible>);
}

const mapStateToProps = (state: any) => {
    return {
        showFilter: state.showFilter
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: IExploreFilterProps) => {
    return {
        pick: () => {
            dispatch(pickDistanceFilter(0));
        },
    }
}

const styles = StyleSheet.create({
    filterParamText: {
        color: '#000',
        textTransform: "uppercase",
        fontWeight: "bold",
        // paddingBottom: 10,
    },
    selectedDistanceText: {
        flex: 1,
        alignItems: "flex-end"
    },
    sizesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    sizePickerBox: {
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 5,
    },
    notSelectedText: {
        color: GRAY_3,
        fontWeight: "500"
    },
    selectedText: {
        color: "#fff",
        fontWeight: "500"
    },
    selected: {
        backgroundColor: GRAY_3,
        color: 'white'
    },
    notSelected: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 2,
        paddingVertical: 10,
        backgroundColor: GRAY_0
    },
    distanceRange: {
        flexDirection: "row",
    },
    thumbStyle: {
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 1,
        width: 30,
        height: 30,

    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExploreFilter);
