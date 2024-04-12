import React from "react";
import {
    View, StyleSheet, Text, Image, TouchableOpacity
} from "react-native";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from 'react-native-size-matters';

const ComunityDisplayCard = ({
    title,
    subtitle,
    previewText,
    location,
    image,
}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.frameView}>
            <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => navigation.navigate("ComunityDisplayPage", {
                    title: title,
                    subtitle: subtitle,
                    location: location,
                    image: image,
                    content: previewText,
                })}
            >
                <View
                    style={styles.frameChildFlexBox}
                >
                    {image && <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: image }}
                    />}
                    <View
                        style={[styles.titleParent, styles.parentFlexBox]}
                    >
                        <Text
                            style={[styles.title]}
                            numberOfLines={2}
                        >
                            {title}
                        </Text>
                        <Text
                            style={[styles.previewText, styles.leftTruncatedTypo]}
                            numberOfLines={3}
                        >
                            {previewText}
                        </Text>
                    </View>
                </View>
                <View style={[styles.locationParent, styles.parentFlexBox]}>
                    <Image
                        style={styles.backIcon}
                        contentFit="cover"
                        
                        source={require("../assets/location_white.png")}
                    />
                    <Text style={[styles.locationText, styles.leftTruncatedTypo]}>
                        {location}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    frameView: {
        marginBottom: Moderate_Units.p_20,
    },
    backIcon: {
        width: Moderate_Units.p_11,
        height: Moderate_Units.p_11,
    },
    frameChildFlexBox: {
        borderTopRightRadius: Moderate_Units.p_20,
        borderTopLeftRadius: Moderate_Units.p_20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.colorWhite,
    },
    image: {
        width: scale(90),
        height: verticalScale(122),
        borderTopLeftRadius: Moderate_Units.p_20,
    },
    titleParent: {
        paddingVertical: Moderate_Units.p_20,
        justifyContent: "center",
        flex: 1,
    },
    parentFlexBox: {
        paddingHorizontal: Moderate_Units.p_20,
        alignSelf: "stretch",
        alignItems: "center",
    },
    title: {
        fontSize: FontSize.fs_16,
        fontFamily: FontFamily.subtitle,
        textAlign: "left",
        color: Color.darkGrey,
        flex: 1,
        overflow: "hidden",
        alignSelf: "stretch",
    },
    previewText: {
        color: Color.lightGrey,
        overflow: "hidden",
        alignSelf: "stretch",
    },
    leftTruncatedTypo: {
        display: "flex",
        fontSize: FontSize.fs_12,
        textAlign: "left",
        fontFamily: FontFamily.subtitle,
        alignItems: "center",
        flex: 1,
    },
    locationParent: {
        borderBottomLeftRadius: Moderate_Units.p_20,
        borderBottomRightRadius: Moderate_Units.p_20,
        backgroundColor: Color.orange,
        paddingVertical: Moderate_Units.p_2,
        flexDirection: "row",
    },
    locationText: {
        color: Color.colorWhite,
        margin: Moderate_Units.p_5,
    },
});

export default ComunityDisplayCard;
