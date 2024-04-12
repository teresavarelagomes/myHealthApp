import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import SubmitButton from "../components/SubmitButton";

const RegistrationHealthData = () => {
    const navigation = useNavigation();

    const ProgressRadio = () => (
        <View style={[styles.ellipseParentFlexBox, styles.marginVertical]}>
            <Image
                style={[styles.unselectedEllipse]}
                contentFit="cover"
                source={require("../assets/round_circle_red.png")}
            />
            <Image
                style={[styles.unselectedEllipse]}
                contentFit="cover"
                source={require("../assets/round_circle_red.png")}
            />
            <Image
                style={[styles.unselectedEllipse]}
                contentFit="cover"
                source={require("../assets/round_circle_red.png")}
            />
            <Image
                style={[styles.unselectedEllipse]}
                contentFit="cover"
                source={require("../assets/round_circle_red.png")}
            />
            <Image
                style={styles.selectedEllipse}
                contentFit="cover"
                source={require("../assets/ellipse_red.png")}
            />
        </View>
    );

    return (
        <View style={styles.page}>
            <View style={[styles.titles, styles.marginVertical]}>
                <Title text={"My Health Data"} />
                <Subtitle text={"To complete your profile setup, add your health data"} />
            </View>
            <ProgressRadio />
            <View style={[styles.marginVertical]}>
                <SubmitButton
                    text={"Next"}
                    onPressButton={() => navigation.navigate("AddUserHealthData")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ellipseParentFlexBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: Moderate_Units.p_30,
    },
    unselectedEllipse: {
        height: Moderate_Units.p_22,
        width: Moderate_Units.p_22,
    },
    selectedEllipse: {
        height: Moderate_Units.p_22,
        width: Moderate_Units.p_22,
    },
    page: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: Color.veryLightGrey,
        paddingHorizontal: Moderate_Units.p_16,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    titles: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    marginVertical: {
        marginVertical: Moderate_Units.p_10,
    }
});

export default RegistrationHealthData;
