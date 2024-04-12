import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View, Pressable, Platform, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DateInputField = ({
    title,
    name,
    value,
    onChangeText,
    hasError,
    errorMessage,
}) => {
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    //const [defaultValue, setValue] = useState(value ? value : moment().format("DD-MM-YYYY").toString());
    const [defaultValue, setValue] = useState(value);

    const onChangeAndroid = ({ type }, selectedDate) => {
        setShow(!show);
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            setValue(moment(currentDate).format("DD-MM-YYYY").toString());
            onChangeText(moment(currentDate).format("DD-MM-YYYY").toString(), name);
        }
    };

    const onChangeIos = ({ type }, selectedDate) => {
        setDate(selectedDate);
    };

    const submitDate = () => {
        setShow(!show);
        setValue(moment(date).format("DD-MM-YYYY").toString());
        onChangeText(moment(date).format("DD-MM-YYYY").toString(), name);
    }

    const exitDatePicker = () => {
        setShow(!show);
    }

    const showMode = () => {
        setShow(!show);
    };

    const DatePicker = () => {
        return (
            <View style={styles.parentDateInputField}>
                <DateTimePicker
                    value={date} display="spinner" onChange={onChangeIos} />
                <View style={styles.parentDatePickerButtons}>
                    <TouchableOpacity onPress={submitDate} style={styles.datePickerButton}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={exitDatePicker} style={styles.datePickerButton}>
                        <Text style={styles.buttonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (Platform.OS === "android") {
        return (
            <View style={styles.parentDateInputField}>
                <Text style={[styles.title]}>
                    {title}
                </Text>
                <View style={styles.parentInput}>
                    <Pressable onPressIn={showMode}>
                        <TextInput 
                            style={styles.textInput} 
                            editable={false} 
                            placeholder={defaultValue ? defaultValue : "Select the date"} 
                            defaultValue={defaultValue} 
                        />
                        {show && <DateTimePicker display="spinner" value={date} onChange={onChangeAndroid} />}
                    </Pressable>
                </View>
                {hasError && <Text style={[styles.errorText]}>
                    {errorMessage || "The field above contains an error"}
                </Text>}
            </View>
        );
    } else {
        return (
            <Pressable onPressIn={showMode}>
                <View style={styles.parentDateInputField}>
                    <Text style={[styles.title]}>
                        {title}
                    </Text>
                    <View style={styles.parentInput}>
                        <Text style={styles.textInput}>
                            {defaultValue ? defaultValue : "Select the date"}
                        </Text>
                    </View>
                    {hasError && <Text style={[styles.errorText]}>
                        {errorMessage || "The field above contains an error"}
                    </Text>}
                    {show && <DatePicker />}
                </View>
            </Pressable>
        );
    }
};

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: FontFamily.subtitle,
        color: Color.colorWhite,
    },
    errorText: {
        marginBottom: Moderate_Units.p_2,
        fontFamily: FontFamily.subtitle,
        color: Color.red
    },
    parentDateInputField: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: FontSize.fs_16,
        color: Color.darkGrey,
        textAlign: "left",
        fontFamily: FontFamily.subtitle,
        marginBottom: Moderate_Units.p_2,
    },
    parentInput: {
        borderRadius: Moderate_Units.p_10,
        borderStyle: "solid",
        borderColor: Color.lightGrey,
        borderWidth: Moderate_Units.p_05,
        backgroundColor: Color.colorWhite,
        padding: Moderate_Units.p_8,
    },
    parentDatePickerButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    datePickerButton: {
        borderRadius: Moderate_Units.p_25,
        borderStyle: "solid",
        borderColor: Color.darkGrey,
        borderWidth: Moderate_Units.p_05,
        height: 40,
        width: 120,
        backgroundColor: Color.darkGrey,
        padding: Moderate_Units.p_11,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        color: Color.darkGrey,
        fontFamily: FontFamily.subtitle,
        fontSize: FontSize.fs_14,
        //backgroundColor: "red",
    },
});

export default DateInputField;