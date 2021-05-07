import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Card} from "react-native-elements";
import {connect} from "react-redux";

interface ISizePickerProps {
    category: string
}

interface ISizePickerState {
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        marginHorizontal: 2,
        borderRadius: 5,
        backgroundColor: '#e1e3e6'
    },
    wrapper: {

    },
    text: {

    },
});


class SizePickerItem extends React.Component<ISizePickerProps, ISizePickerState> {
    render() {
        return <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
            <Text style={styles.text}>{this.props.category}</Text>
            <Text style={styles.text}>kg</Text>
        </Card>
    }
}

export default SizePickerItem;
