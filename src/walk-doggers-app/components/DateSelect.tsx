import {Image, Platform, ScrollView} from "react-native";

import React, {useContext, useEffect, useState} from "react";
import {BLUE, GRAY_0, GRAY_00, GRAY_1, GRAY_2, GRAY_3, PRIMARY} from "../constants/Colors";

import {
    StyleSheet,
    View,
    Text, TextInput, TouchableOpacity,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useIsFocused} from "@react-navigation/native";
import AuthContext from "../navigation/AuthContext";
import {useNavigation} from '@react-navigation/native';
import CalendarDays from 'react-native-calendar-slider-carousel';
import Collapsible from 'react-native-collapsible';
import {Picker} from '@react-native-community/picker';

import {format} from 'date-fns'
import parse from 'date-fns/parse'


const DateSelect = ({onDateTimeSelect}: any) => {

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [showTimeSelector, setShowTimeSelector] = useState(false);

    const timeOptions = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
            const hours = i < 10 ? `0${i}` : i;
            const minutes = j == 0 ? '00' : j;
            timeOptions.push(`${hours}:${minutes}`);
        }
    }

    const pickerOptions = timeOptions.map(time => {
        return <Picker.Item key={time} label={time} value={time}/>;
    });

    const onDateSelect = selectedDate => {
        setDate(selectedDate);
        setShowDateSelector(false);
    }

    const onTimeSelect = selectedTime => {
        console.log(selectedTime);
        setTime(selectedTime);
        setShowTimeSelector(false);
    }

    useEffect(() => {
        if (date !== null && time !== null) {
            const datetime = `${date} ${time}`;
            onDateTimeSelect(datetime);
        }
    }, [time, date])

    return (
        <View>

            <View style={styles.container} horizontal>
                <TouchableOpacity onPress={() => setShowDateSelector(prevState => !prevState)}>
                    <Text style={styles.text1}>
                        {date ? format(parse(date, 'yyyy-MM-dd', new Date()), 'dd. MM. yyyy') : "Select"}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text2}>at</Text>
                <TouchableOpacity onPress={() => setShowTimeSelector(prevState => !prevState)}>
                    <Text style={styles.text1}>{time || "Select"}</Text>
                </TouchableOpacity>
            </View>
            <Collapsible collapsed={!showDateSelector}>
                <CalendarDays
                    firstDate={new Date()}
                    numberOfDays={30}
                    selectedDate={new Date()}
                    arrows={true}
                    onDateSelect={onDateSelect}
                    leftArrow={<Ionicons name="arrow-back" size={26} color="#555"/>}
                    rightArrow={<Ionicons name="arrow-forward" size={26} color="#555"/>}
                />
            </Collapsible>
            <Collapsible collapsed={!showTimeSelector}>
                <Picker
                    mode="dropdown"
                    style={Platform.OS === 'web' && {width: 80, marginTop: 12}}
                    selectedValue={time}
                    onValueChange={onTimeSelect}
                >
                    {pickerOptions}
                </Picker>
            </Collapsible>
        </View>
    );
}
const styles = StyleSheet.create({
    text1: {
        fontSize: 18,
        color: BLUE,
        fontWeight: "500"
    },
    text2: {
        fontWeight: "500",
        fontSize: 18,
        color: GRAY_3,
        paddingHorizontal: 12
    },
    container: {
        flexDirection: "row",
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
        backgroundColor: GRAY_00,
        borderRadius: 1,
        paddingHorizontal: 10,
    },

});
export default DateSelect;
