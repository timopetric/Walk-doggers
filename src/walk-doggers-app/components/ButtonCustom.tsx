import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {GRAY_2, PRIMARY, PINKISH_WHITE, PRIMARY_DARK, RED, GREEN} from '../constants/Colors';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  },
  button: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "flex-end",
        borderRadius: 8,
        padding: 5,
        marginTop: 10
    },
    btnText: {
        fontFamily: "red-hat-text-500",
        fontSize: 17,
        padding: 5,
    }

})

interface IButtonProps {
    color?: string;
    text?: string;
    onPress?: any;
    style?: any;
}

class ButtonCustom extends React.Component<IButtonProps> {
    render() {
        
        return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
                    <View style={[styles.button, (this.props.color === "purple") ? { backgroundColor: PRIMARY} : {}, (this.props.color === "red") ? { backgroundColor: RED} : {}, (this.props.color === "green") ? { backgroundColor: GREEN} : {}]}>
                        <Text style={[styles.btnText, (this.props.color === "purple") ? { color: PINKISH_WHITE} : {color: "#fff"} ]}>{this.props.text}</Text>
                    </View>
            </TouchableOpacity>
        )
            
        


    }
}

export default ButtonCustom
