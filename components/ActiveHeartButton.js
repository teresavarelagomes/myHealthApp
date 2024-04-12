import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const ActiveHeartButton = ({ style }) => {
  return (
    <View style={[styles.heartWithPulseParent, style]}>
      <Image
        style={styles.heartWithPulse}
        contentFit="cover"
        source={require("../assets/heart_red.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heartWithPulse: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  heartWithPulseParent: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActiveHeartButton;
