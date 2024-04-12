import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View, Pressable, Platform, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import GarbageButton from "./GarbageButton";

const TimeInputField = ({
    title,
    value,
    onChangeText,
    hasError,
    errorMessage,
    hasDelete,
    index,
    onDelete,
}) => {

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [defaultValue, setValue] = useState(value)

    const onChangeAndroid = ({ type }, selectedDate) => {
        setShow(!show);
        if (type == "set") {
            currentDate = selectedDate;
            setDate(currentDate);
            setValue(moment(currentDate).format('HH:mm').toString());
            onChangeText(index, (moment(currentDate).format('HH:mm').toString()));
        }
    };

    const onChangeIos = ({ type }, selectedDate) => {
        setDate(selectedDate);
    };

    const onClickGarbageButton = () => {
        onDelete(index);
    };

    const submitDate = () => {
        setShow(!show);
        setValue(moment(date).format('HH:mm').toString());
        onChangeText(index, (moment(date).format('HH:mm').toString()));
    }

    const exitDatePicker = () => {
        setShow(!show);
    }

    const showMode = () => {
        setShow(!show);
    };

    const DeleteTimePicker = () => (
        <View style={styles.marginLeft}>
            <GarbageButton onGarbageClick={onClickGarbageButton} />
        </View>
    );

    const DatePicker = () => {
        return (
            <View style={styles.parentDateTimePicker}>
                <DateTimePicker
                    display="spinner" mode={"time"} is24Hour={true} value={date} onChange={onChangeIos} />
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
                {title &&
                    <Text style={[styles.title]}>
                        {title}
                    </Text>}
                <View style={styles.parentButtons}>
                    <View style={styles.parentPressableInput}>
                        <Pressable onPressIn={showMode}>
                            <TextInput style={styles.textInput} editable={false} defaultValue={defaultValue} />
                        </Pressable>
                        {show && <DateTimePicker display="spinner" mode={"time"} is24Hour={true} value={date} onChange={onChangeAndroid} />}
                    </View>
                    {hasDelete && <DeleteTimePicker />}
                </View>
                {hasError && <Text style={styles.errorText}>
                    {errorMessage || "The field above contains an error"}
                </Text>}
            </View>
        );
    } else {
        return (
            <View style={styles.parentDateInputField}>
                {title && <Text style={[styles.title]}>
                    {title}
                </Text>}
                <View style={styles.parentButtons}>
                    <Pressable onPressIn={showMode}>
                        <View style={styles.parentPressableInput}>
                            <Text style={styles.textInput}>
                                {defaultValue}
                            </Text>
                        </View>
                    </Pressable>
                    {hasDelete && <DeleteTimePicker />}
                </View>
                {show && <DatePicker />}
                {hasError && <Text style={[styles.errorText]}>
                    {errorMessage || "The field above contains an error"}
                </Text>}
            </View>

        );
    }
};

const styles = StyleSheet.create({
    marginLeft: {
        marginLeft: Moderate_Units.p_5
    },
    errorText: {
        marginTop: Moderate_Units.p_2,
        fontFamily: FontFamily.subtitle,
        color: Color.red
    },
    parentButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: FontFamily.subtitle,
        color: Color.colorWhite,
    },
    parentDateInputField: {
        marginBottom: Moderate_Units.p_10,
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
    parentPressableInput: {
        borderRadius: Moderate_Units.p_10,
        borderStyle: "solid",
        borderColor: Color.lightGrey,
        borderWidth: Moderate_Units.p_05,
        backgroundColor: Color.colorWhite,
        padding: Moderate_Units.p_8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
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
    },
});

export default TimeInputField;