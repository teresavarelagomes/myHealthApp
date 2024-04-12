import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Moderate_Units } from "../GlobalStyles";

const InactiveReportButton = ({ style }) => {
  return (
    <View style={[styles.barChartParent, style]}>
      <Image
        style={styles.barChartIcon}
        contentFit="cover"
        source={require("../assets/report_grey.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barChartIcon: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  barChartParent: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InactiveReportButton;
