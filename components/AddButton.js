import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const AddButton = ({ onAddClick }) => {

    return (
        <TouchableOpacity
            style={[styles.ellipseParent]}
            activeOpacity={0.2}
            onPress={onAddClick}
        >
            <Image
                style={styles.addEllipse}
                contentFit="cover"
                source={require("../assets/ellipse_main.png")}
            />
            <Image
                style={[styles.addIcon, styles.iconPosition]}
                contentFit="cover"
                source={require("../assets/icons8-plus-96.png")}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ellipseParent: {
        flexWrap: "wrap",
        justifyContent: "center",
        elevation: 4,
        shadowRadius: 4,
            shadowColor: "rgba(0, 0, 0, 0.10)",
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        alignItems: "center",
        flexDirection: "row",
    },
    iconPosition: {
        zIndex: 1,
        position: "absolute",
    },
    addEllipse: {
        width: Moderate_Units.p_30,
        height: Moderate_Units.p_30,
    },
    addIcon: {
        width: Moderate_Units.p_16,
        height: Moderate_Units.p_16,
    },
});

export default AddButton;