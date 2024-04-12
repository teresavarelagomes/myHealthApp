import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const InactiveHomeButton = ({ style }) => {
  return (
    <View style={[styles.ellipseParent, style]}>
      <Image
        style={styles.menuIcon}
        contentFit="cover"
        source={require("../assets/home_grey.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
   menuIcon: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  ellipseParent: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InactiveHomeButton;
