import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import GoBack from "../components/GoBack";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";

const MotivationalMessage = ( {route} ) => {
  const navigation = useNavigation();

  return (
    <View style={styles.frameParent}>
      <GoBack
        goBackTitle="Motivational message"
        onFrameGoBackPress={() => navigation.navigate("DisplayScreen" )}
        back={require("../assets/back-grey.png")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={[styles.yellowBubble, styles.parentBox]}>
          <Text
            style={[styles.whiteText, styles.buttonType]}
          >{route.params.message}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  yellowBubble: {
    marginTop: Moderate_Units.p_10,
    padding: Moderate_Units.p_15,
    borderRadius: Moderate_Units.p_10,
    backgroundColor: Color.yellow,
  },
  frameScrollViewContent: {
    paddingBottom: Moderate_Units.p_30,
  },
  marginBottom: {
    marginBottom: Moderate_Units.p_55,
  },
  buttonType: {
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
  },
  whiteText: {
    fontSize: FontSize.fs_16,
    color: Color.colorWhite,
  },
  frameParent: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: Moderate_Units.p_40,
    paddingHorizontal: Moderate_Units.p_16,
    backgroundColor: Color.veryLightGrey,
  },
});

export default MotivationalMessage;
