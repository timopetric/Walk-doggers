import React from "react";
import {GRAY_00, GRAY_1, GRAY_PURPLE_00, GRAY_PURPLE_1} from "../constants/Colors";

import {
    StyleSheet,
    View,
    Text, TextInput,
} from "react-native";

const FormItem = ({label, placeholder, getText, setText, editable, height, children}: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {children === undefined ?
                <TextInput
                    style={[styles.input, height !== undefined && {
                        height: height,
                        paddingTop: 12,
                        textAlignVertical: "top"
                    }]}
                    onChangeText={getText}
                    placeholder={placeholder}
                    placeholderTextColor={GRAY_PURPLE_1}
                    multiline={height !== undefined}
                    value={setText}
                    editable={editable}
                />
                : children}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        fontFamily: 'red-hat-text-500',
        color: 'black',
        fontSize: 13,
        marginBottom: 4,
    },
    input: {
        height: 48,
        fontSize: 15,
        backgroundColor: GRAY_PURPLE_00,
        borderRadius: 1,
        paddingHorizontal: 10,
    },

});
export default FormItem;
