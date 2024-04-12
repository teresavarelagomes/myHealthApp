import React from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Moderate_Units } from "../GlobalStyles";

const NextPageIcon = () => {
  return (
    <Image
      style={styles.nextPageIcon}
      contentFit="cover"
      source={require("../assets/next_page.png")}
    />
  );
};

const styles = StyleSheet.create({
  nextPageIcon: {
    width: Moderate_Units.p_20,
    height: Moderate_Units.p_20,
  },
});

export default NextPageIcon;
