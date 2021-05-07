import React from "react";
import {Text, View} from "react-native";

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

export default ExploreFilter;
