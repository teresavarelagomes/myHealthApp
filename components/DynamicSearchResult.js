import React from "react";
import {
    View, StyleSheet, Text, TouchableOpacity
} from "react-native";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const DynamicSearchResult = ({
    title,
    subtitle,
    navigationRoute,
    navigationParam,
}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(navigationRoute, { 
            title: title,
            subtitle: subtitle,
            item: navigationParam
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.2}
            onPressIn={handlePress}
        >
            <View style={styles.frameChildFlexBox}>
                <View
                    style={[subtitle ? styles.smallerPadding : styles.biggerPadding]}
                >
                    <Text
                        style={[styles.title]}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    {subtitle && <Text
                        style={[styles.subtitle]}
                        numberOfLines={1}
                    >
                        {subtitle}
                    </Text>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    frameChildFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    smallerPadding: {
        paddingVertical: Moderate_Units.p_5,
        paddingHorizontal: Moderate_Units.p_5,
    },
    biggerPadding: {
        paddingVertical: Moderate_Units.p_10,
        paddingHorizontal: Moderate_Units.p_5,
    },
    title: {
        fontSize: FontSize.fs_16,
        fontFamily: FontFamily.subtitle,
        textAlign: "left",
        color: Color.darkGrey,
    },
    subtitle: {
        fontSize: FontSize.fs_13,
        fontFamily: FontFamily.subtitle,
        textAlign: "left",
        color: Color.lightGrey,
    },
});

export default DynamicSearchResult;
