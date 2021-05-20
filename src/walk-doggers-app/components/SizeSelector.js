import React from "react";

import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {BLUE, GRAY_3, GRAY_0, GRAY_1, GRAY_2} from '../constants/Colors';


const SizeSelectorBox = props => {
    const {category, selected, onSelect} = props;
    return (
        <TouchableOpacity onPress={onSelect}
                          style={[styles.notSelected, selected && styles.selected]}>
            <Text style={selected ? styles.selectedText : styles.notSelectedText}>{category}</Text>
            <Text style={selected ? styles.selectedText : styles.notSelectedText}>kg</Text>
        </TouchableOpacity>)
}

const SizeSelector = props => {

    const {selectedIndex, selectedIndexes, categories, setSelectedIndexes, setSelectedIndex, multiple, style} = props;

    const onSelect = (index) => {
        if (multiple) {
            setSelectedIndexes(prev => {
                if (prev.has(index)) {
                    prev.delete(index);
                    return new Set(prev);
                } else {
                    prev.add(index);
                    return new Set(prev);
                }
            });
        } else {
            setSelectedIndex(index);
        }

    }

    const itemComponents = categories.map((item, index) => {
        return <SizeSelectorBox key={index} category={item}
                                selected={multiple ? selectedIndexes.has(index) : selectedIndex === index}
                                onSelect={() => onSelect(index)}/>
    })
    return <View style={[styles.sizesRow, style]}>{itemComponents}</View>
}

const styles = StyleSheet.create({
    sizesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    notSelectedText: {
        color: GRAY_3,
        fontWeight: "500"
    },
    selectedText: {
        color: "#fff",
        fontWeight: "500"
    },
    selected: {
        backgroundColor: GRAY_3,
        color: 'white'
    },
    notSelected: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 2,
        paddingVertical: 10,
        backgroundColor: GRAY_0
    },
});
export default SizeSelector;
