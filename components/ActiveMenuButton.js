import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const ActiveMenuButton = ({ style }) => {
  return (
    <View style={[styles.menuParent, style]}>
      <Image
        style={styles.menuIcon}
        contentFit="cover"
        source={require("../assets/menu_red.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  menuParent: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActiveMenuButton;
