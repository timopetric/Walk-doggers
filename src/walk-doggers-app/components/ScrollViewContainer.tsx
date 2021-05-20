import {ScrollView, StyleSheet, View} from "react-native";
import * as React from "react";
import {LIGHT_BG} from "../constants/Colors";

export default function ScrollViewContainer({children}: any) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <View style={styles.innerContainer}>
                {children}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        // margin: 20,
        paddingHorizontal: 20,
        backgroundColor: LIGHT_BG,
        flex: 1
    },
    innerContainer: {
        marginTop: 20,
        width: 800,
        maxWidth: "100%",
        flex: 1
    },
});
