import React from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {store, toggleFilter} from "../redux/store";

interface IExploreFilterProps {
    sizeCategory?: number;
    distance?: number;
    showFilter?: boolean;
}

interface IExploreFilterState {

}

class ExploreFilter extends React.Component<IExploreFilterProps, IExploreFilterState> {

    render() {
        if (this.props.showFilter){
            return <View>
                <Text>Explore filter</Text>
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
