import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import Registry from "./Registry";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { getRegistryEllipse } from "../utils/biometric";

const registries = [
  {
    parameter: "Weight",
    unit: "(kg)",
    value: "102",
  },
  {
    parameter: "BMI",
    unit: "(kg/m2)",
    value: "80",
  }
];
const existRegistries = true;
  
const ReportWeightRegistries = ( {
  weight, imc
} ) => {
  if (existRegistries > 0) {
    return (
      <View style={styles.frameContainer}>
          <Registry 
            parameter={registries[0].parameter} 
            unit={registries[0].unit} 
            value={weight} 
          />
          <Registry 
            parameter={registries[1].parameter} 
            unit={registries[1].unit} 
            value={imc} 
            ellipse={getRegistryEllipse(imc, "BMI")} 
          />
      </View>
    );
  } else {
    return (<View style={styles.emptyMessageParent}>
      <Text style={styles.emptyMessage}>No biometric records. Please add you measurements first. </Text>
    </View>)
  };
}

const styles = StyleSheet.create({
  frameContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyMessage: {
    fontSize: FontSize.fs_12,
    color: Color.lightGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
  },
  emptyMessageParent: {
    marginTop: Moderate_Units.p_2,
  }
});

export default ReportWeightRegistries;