import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {store, pickDistanceFilter} from "../redux/store";
import {Slider} from "react-native-elements";
import SizePickerItem from "./SizePickerItem";
import {categories} from "../constants/Values";

interface IExploreFilterProps {
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

    },
    sizesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    }
});

function CategoriesRow() {
    let sizePickerItems : any = [];
    categories.forEach((category, index, arr) => {
        sizePickerItems.push(
            <SizePickerItem category={category} key={index} />
        )
    })

    return <View style={styles.sizesRow}>{sizePickerItems}</View>
}

class ExploreFilter extends React.Component<IExploreFilterProps, IExploreFilterState> {
    render() {
        if (this.props.showFilter){
            return <View style={ {width: '100%', padding: 20 }}>
                <Text style={styles.filterParamText}>Size</Text>
                <CategoriesRow/>

                <Text style={styles.filterParamText}>Distance</Text>
                <Slider
                    value={0.5}
                    thumbTintColor='white'
                    minimumTrackTintColor='blue'
                    style={styles.sliderStyle}
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

const mapDispatchToProps = (dispatch : any, ownProps : IExploreFilterProps) => {
    return {
        pick: () => {
            dispatch(pickDistanceFilter(0));
        },
    }
}

export default connect(mapStateToProps)(ExploreFilter);
