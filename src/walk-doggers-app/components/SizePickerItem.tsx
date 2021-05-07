import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {Button, Card} from "react-native-elements";
import {connect} from "react-redux";
import {Provider} from "react-redux";
import {store, pickSizeFilter} from "../redux/store";

interface ISizePickerProps {
    category: string
    pick?: Function
}

interface ISizePickerState {
    selected: boolean
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 5,
    },
    wrapper: {

    },
    text: {

    },
    selected: {
        backgroundColor: '#747575'
    },
    notSelected: {
        backgroundColor: '#e1e3e6'
    },
    touchable: {

    }
});

const mapStateToProps = (state: any) => {
    return {
        showFilter: state.showFilter
    }
}

const mapDispatchToProps = (dispatch : any, ownProps : ISizePickerProps) => {
    return {
        pick: () => {
            dispatch(pickSizeFilter(ownProps.category));
        },
    }
}

let unsubscribe : any = null;

class SizePickerItem extends React.Component<ISizePickerProps, ISizePickerState> {
    constructor(props: ISizePickerProps) {
        super(props);

        this.state = {
            selected: store.getState().selectedSize == this.props.category
        }
    }

    render() {
        return <Provider store={store}>
            <Pressable style={styles.touchable} onPress={() => {if (this.props.pick) this.props.pick()} }>
                <Card containerStyle={[styles.container, this.state.selected ? styles.selected : styles.notSelected]} wrapperStyle={styles.wrapper}>
                    <Text style={styles.text}>{this.props.category}</Text>
                    <Text style={styles.text}>kg</Text>
                </Card>
            </Pressable>
        </Provider>
    }

    componentDidMount() {
        unsubscribe = store.subscribe(() => this.setState({selected: store.getState().selectedSize == this.props.category}))
    }

    componentWillUnmount() {
        if (unsubscribe != null){
            console.log("unsubscribing")
            console.log(unsubscribe)
            unsubscribe();
            unsubscribe = null;
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(SizePickerItem);
