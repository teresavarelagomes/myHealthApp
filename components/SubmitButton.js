import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from "react-native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";

const SubmitButton = ({
    text,
    textSize,
    onPressButton,
    color,
    textColor,
    borderRadius,
    removeShadow,
    disabled
}) => {
    return (
        <View>
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.2}
                onPress={onPressButton}
                style={[
                    color ? {
                        backgroundColor: color,
                    } : {
                        backgroundColor: Color.orange,
                    },
                    !removeShadow && {
                        elevation: 4,
                        shadowRadius: 4,
                        shadowColor: "rgba(0, 0, 0, 0.10)",
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                    },
                    borderRadius ? {
                        borderRadius: borderRadius
                    } : {
                        borderRadius: Moderate_Units.p_25,
                    }, styles.submitButton]}
            >
                <Text
                    style={[textColor ? {
                        color: textColor,
                    } : {
                        color: Color.colorWhite,
                    }, textSize ? {
                        fontSize: textSize
                    } : {
                        fontSize: FontSize.fs_20,
                    }, styles.buttonText]}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Moderate_Units.p_5,
        paddingVertical: Moderate_Units.p_10,
    },
    buttonText: {
        textAlign: "center",
        fontFamily: FontFamily.subtitle,
    },
});

export default SubmitButton;
