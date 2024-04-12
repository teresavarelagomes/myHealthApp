
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
    parameter: "Blood Pressure",
    unit: "(mmHg)",
  },
  {
    parameter: "Heart Rate",
    unit: "(bpm)",
  }
];
const existRegistries = true;
  
const ReportBloodPressureRegistries = ( {
  bloodPressure, heartRate  
} ) => {
  if (existRegistries > 0) {
    return (
      <View style={styles.frameContainer}>
          <Registry 
            parameter={registries[0].parameter} 
            unit={registries[0].unit} 
            value={bloodPressure} 
            ellipse={getRegistryEllipse(bloodPressure, "BLOOD_PRESSURE")} 
          />
          <Registry 
            parameter={registries[1].parameter} 
            unit={registries[1].unit} 
            value={heartRate}
            ellipse={getRegistryEllipse(heartRate, "HEART_RATE")} 
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

export default ReportBloodPressureRegistries;