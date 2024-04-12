
import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import Registry from "./Registry";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { getRegistryEllipse } from "../utils/biometric";

const registries = [
  {
    parameter: "Blood Pressure",
    unit: "(mmHg)",
  },
  {
    parameter: "Heart Rate",
    unit: "(bpm)",
  },
  {
    parameter: "Weight",
    unit: "(kg)",
  },
  {
    parameter: "BMI",
    unit: "(kg/m2)",
  }
];

const DisplayScreenRegistries = ( {
  bloodPressure, 
  heartRate, 
  weight, 
  imc
}) => {
  
  if (registries?.length > 0) {
    return (
      <View style={styles.frameContainer}>
        <View style={styles.columnContainer}>
        {bloodPressure && <Registry 
            parameter={registries[0].parameter} 
            unit={registries[0].unit} 
            value={bloodPressure} 
            ellipse={getRegistryEllipse(bloodPressure, "BLOOD_PRESSURE")} 
        />}
        {heartRate && <Registry 
            parameter={registries[1].parameter} 
            unit={registries[1].unit} 
            value={heartRate} 
            ellipse={getRegistryEllipse(heartRate, "HEART_RATE")} 
        />}
        </View>
        <View style={styles.columnContainer}>
        {weight && <Registry 
            parameter={registries[2].parameter} 
            unit={registries[2].unit} 
            value={weight} 
        />}
        {imc && <Registry 
            parameter={registries[3].parameter} 
            unit={registries[3].unit} 
            value={imc} 
            ellipse={getRegistryEllipse(imc, "BMI")} 
        />}
        </View>
        </View>
      )
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
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
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

export default DisplayScreenRegistries;