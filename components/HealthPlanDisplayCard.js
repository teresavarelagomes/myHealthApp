import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { scale } from 'react-native-size-matters';

const HealthPlanDisplayCard = ({ title, authors, previewText, date, image, video }) => {
    const navigation = useNavigation();
    const thumbnailUrl = `https://img.youtube.com/vi/${video}/0.jpg`;

    return (
        <View style={styles.frameView}>
            <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => navigation.navigate("HealthPlanDisplayPage", {
                    title: title,
                    authors: authors,
                    date: date,
                    image: image,
                    video: video,
                    content: previewText,
                })}            >
                {image && <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: image }}
                />}
                {video && 
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: thumbnailUrl }}
                />}
                <View style={styles.cardTextParent}>
                    <Text style={[styles.dateText]}>{date}</Text>
                    <View style={styles.mainTextParent}>
                        <Text style={[styles.titleText]} numberOfLines={2}>
                            {title}
                        </Text>
                        <Text
                            style={[styles.previewText]}
                            numberOfLines={2}
                        >
                            {previewText}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    frameView: {
        marginBottom: Moderate_Units.p_20,
        borderRadius: Moderate_Units.p_20,
        flex: 1,
    },
    image: {
        borderTopLeftRadius: Moderate_Units.p_20,
        borderTopRightRadius: Moderate_Units.p_20,
        height: scale(90),
        flex: 1,
        width: null,
    },
    dateText: {
        color: Color.orange,
        fontSize: FontSize.fs_12,
        fontFamily: FontFamily.subtitle,
        textAlign: "left",
    },
    titleText: {
        fontSize: FontSize.fs_16,
        fontFamily: FontFamily.subtitle,
        textAlign: "left",
        color: Color.darkGrey,
        flex: 1,
        overflow: "hidden",
        paddingBottom: Moderate_Units.p_1,
    },
    previewText: {
        flex: 1,
        color: Color.lightGrey,
        overflow: "hidden",
        fontSize: FontSize.fs_12,
        fontFamily: FontFamily.subtitle,
        alignItems: "center",
        textAlign: "left",
        paddingBottom: Moderate_Units.p_2,
    },
    mainTextParent: {
        marginTop: Moderate_Units.p_2,
    },
    cardTextParent: {
        padding: Moderate_Units.p_20,
        backgroundColor: Color.colorWhite,
        borderBottomLeftRadius: Moderate_Units.p_20,
        borderBottomRightRadius: Moderate_Units.p_20,
    },
});

export default HealthPlanDisplayCard;
