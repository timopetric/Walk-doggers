import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {store, toggleFilter} from "../redux/store";
import {Slider} from "react-native-elements";
import SizePickerItem from "./SizePickerItem";

interface IExploreFilterProps {
    sizeCategory?: number;
    distance?: number;
    showFilter?: boolean;
}

interface IExploreFilterState {

}

const styles = StyleSheet.create({
    filterParamText: {
        color: '#393c40',
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    sliderStyle: {
        width: '80%',
    },
    sizesRow: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
    }
});

const categories = [
    "1-5 kg",
    "5-10 kg",
    "10-20 kg",
    "20-40 kg",
    "40+ kg",
]

function CategoriesRow() {
    let sizePickerItems : any = [];
    categories.forEach((category, index, arr) => {
        sizePickerItems.push(
            <SizePickerItem category={category} key={index}/>
        )
    })

    return <View style={styles.sizesRow}>{sizePickerItems}</View>
}

class ExploreFilter extends React.Component<IExploreFilterProps, IExploreFilterState> {
    render() {
        if (this.props.showFilter){
            return <View style={ {width: '100%', padding: 20}}>
                <Text style={styles.filterParamText}>Size</Text>
                <CategoriesRow/>

                <Text style={styles.filterParamText}>Distance</Text>
                <Slider
                    value={0.5}
                    thumbTintColor='white'
                    minimumTrackTintColor='blue'
                />
            </View>
        }
        return <View/>

    }
}

const mapStateToProps = (state: any) => {
    return {
        showFilter: state.showFilter
    }
}

export default connect(mapStateToProps)(ExploreFilter);
