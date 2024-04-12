import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const GarbageButton = ({ onGarbageClick }) => {

    return (
        <TouchableOpacity
            style={[styles.ellipseParent]}
            activeOpacity={0.2}
            onPress={onGarbageClick}
        >
            <Image
                style={styles.garbageEllipse}
                contentFit="cover"
                source={require("../assets/ellipse_red.png")}
            />
            <Image
                style={[styles.garbageIcon, styles.iconPosition]}
                contentFit="cover"
                source={require("../assets/icons8-garbage-90.png")}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    garbageEllipse: {
        width: Moderate_Units.p_30,
        height: Moderate_Units.p_30,
    },
    garbageIcon: {
        width: Moderate_Units.p_20,
        height: Moderate_Units.p_20,
    },
    iconPosition: {
        zIndex: 1,
        position: "absolute",
    },
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
});

export default GarbageButton;