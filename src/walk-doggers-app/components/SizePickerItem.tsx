import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Card} from "react-native-elements";


interface ISizePickerProps {
    category: string
}

interface ISizePickerState {
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        height: 10,
        width: 10,
        backgroundColor: 'blue'
    },
    text: {
        textAlign: "center"
    }
});


class SizePickerItem extends React.Component<ISizePickerProps, ISizePickerState> {
    render() {
        /*return <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>{this.props.category}</Text>
            </View>
        </View>*/
        return <Card>
            <Text style={styles.text}>{this.props.category}</Text>
        </Card>
    }
}

export default SizePickerItem;
