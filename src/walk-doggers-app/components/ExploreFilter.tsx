import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {store, pickDistanceFilter, pickSizeFilter} from "../redux/store";
import {Card, Slider} from "react-native-elements";
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
    },
    touchable: {

    },
    text: {

    },
    sizePickerBox: {
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 5,
    },
    selected: {
        backgroundColor: '#747575'
    },
    notSelected: {
        backgroundColor: '#e1e3e6'
    },
});

function FilterSizePicker() {
    const [selected, setSelected] = useState(store.getState().selectedSize);

    let sizePickerItems : any = [];
    categories.forEach((category, index, arr) => {
        sizePickerItems.push(
            <SizePickerBox category={category} selected = {selected} key={index} index={index} setSelected={setSelected}/>
        )
    })

    return <View style={styles.sizesRow}>{sizePickerItems}</View>

}

function onPressBox(props: any) {
    props.setSelected(props.index);
    store.dispatch(pickSizeFilter(props.index));
}

function SizePickerBox(props: any) {
    return (
        <Pressable style={styles.touchable} onPress={() => onPressBox(props) }>
            <Card containerStyle={[styles.sizePickerBox, props.selected == props.index ? styles.selected : styles.notSelected]}>
                <Text style={styles.text}>{props.category}</Text>
                <Text style={styles.text}>kg</Text>
            </Card>
        </Pressable>
    )
}

class ExploreFilter extends React.Component<IExploreFilterProps, IExploreFilterState> {
    render() {
        if (this.props.showFilter){
            return <View style={ {width: '100%', padding: 20 }}>
                <Text style={styles.filterParamText}>Size</Text>
                <FilterSizePicker/>

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

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFilter);
