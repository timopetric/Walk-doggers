import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {store, pickDistanceFilter, pickSizeFilter} from "../redux/store";
import {Card, Slider} from "react-native-elements";
import {categories, maxDistance} from "../constants/Values";

interface IExploreFilterProps {
    showFilter?: boolean;
}

interface IExploreFilterState {
    selectedSize?: number;
}

const styles = StyleSheet.create({
    filterParamText: {
        color: '#393c40',
        textTransform: "uppercase",
        fontWeight: "bold",
        flex: 1
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
    selected: {
        backgroundColor: '#747575'
    },
    notSelected: {
        backgroundColor: '#e1e3e6'
    },
    distanceRange: {
        flexDirection: "row",
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

function onSliderValueChange(value: number, comp: ExploreFilter){
    comp.setState({selectedSize: value});
    store.dispatch(pickDistanceFilter(value));
}

function SizePickerBox(props: any) {
    return (
        <Pressable onPress={() => onPressBox(props) }>
            <Card containerStyle={[styles.sizePickerBox, props.selected == props.index ? styles.selected : styles.notSelected]}>
                <Text>{props.category}</Text>
                <Text>kg</Text>
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

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.filterParamText}>Distance</Text>
                    <View style={styles.selectedDistanceText}>
                        <Text>{store.getState().selectedDistance}</Text>
                    </View>
                </View>

                <Slider
                    value={store.getState().selectedDistance / maxDistance}
                    thumbTintColor='white'
                    minimumTrackTintColor='blue'
                    onValueChange={(value) => onSliderValueChange(Math.round(value * maxDistance), this)}
                />
                <View style={styles.distanceRange}>
                    <Text style={{flex: 1, fontWeight: "bold"}}>0 km</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: "bold"}}>200 km</Text>
                    </View>

                </View>
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
