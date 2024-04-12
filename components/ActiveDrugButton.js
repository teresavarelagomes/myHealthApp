import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const ActiveDrugButton = ({ style }) => {
  return (
    <View style={[styles.pillParent, style]}>
      <Image
        style={styles.pillIcon}
        contentFit="cover"
        source={require("../assets/drug_red.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pillIcon: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  pillParent: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActiveDrugButton;
