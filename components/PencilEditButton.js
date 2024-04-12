import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import GarbageButton from "./GarbageButton";
import AddButton from "./AddButton";
import { Moderate_Units } from "../GlobalStyles";

const PencilEditButton = ({ clicked, onAddClick, onGarbageClick, onPencilClick, garbageEnabled, plusEnabled = true }) => {

    if (clicked) {
        return (
            <View style={[styles.parentButtonDisplay, styles.frameView, styles.frameFlexBox]}>
                <View style={styles.frameFlexBox}>
                    {plusEnabled && <AddButton onAddClick={onAddClick} />}
                    {garbageEnabled && <View style={styles.marginLeft}>
                        <GarbageButton onGarbageClick={onGarbageClick} />
                    </View>}
                </View>
                <TouchableOpacity
                    style={[
                        styles.ellipseContainer,
                        styles.ellipseParentShadowBox,
                    ]}
                    activeOpacity={0.2}
                    onPress={onPencilClick}
                >
                    <Image
                        style={styles.selectedPencilEllipse}
                        contentFit="cover"
                        source={require("../assets/ellipse_main.png")}
                    />
                    <Image
                        style={[styles.selectedPencilIcon, styles.iconPosition]}
                        contentFit="cover"
                        source={require("../assets/clarityeditline2.png")}
                    />
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={styles.parentButtonDisplay}>
                <TouchableOpacity
                    style={[
                        styles.ellipseContainer,
                        styles.ellipseParentShadowBox,
                    ]} activeOpacity={0.2}
                    onPress={onPencilClick}
                >
                    <Image
                        style={styles.pencilEllipse}
                        contentFit="cover"
                        source={require("../assets/ellipse_main.png")}
                    />
                    <Image
                        style={[styles.pencilIcon, styles.iconPosition]}
                        contentFit="cover"
                        source={require("../assets/clarityeditline.png")}
                    />

                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    marginLeft: {
        marginLeft: Moderate_Units.p_5
    },
    iconPosition: {
        zIndex: 1,
        position: "absolute",
    },
    pencilIcon: {
        width: Moderate_Units.p_20,
        height: Moderate_Units.p_20,
    },
    pencilEllipse: {
        width: Moderate_Units.p_40,
        height: Moderate_Units.p_40,
    },
    parentButtonDisplay: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: Moderate_Units.p_8,
    },
    ellipseParentShadowBox: {
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    frameFlexBox: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
    },
    selectedPencilEllipse: {
        width: Moderate_Units.p_40,
        height: Moderate_Units.p_40,
    },
    selectedPencilIcon: {
        width: Moderate_Units.p_20,
        height: Moderate_Units.p_20,
    },
    ellipseContainer: {
        flexWrap: "wrap",
        marginLeft: Moderate_Units.p_5,
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
    frameView: {
        marginTop: Moderate_Units.p_10,
    },
});

export default PencilEditButton;