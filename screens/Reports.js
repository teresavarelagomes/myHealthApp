import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Subtitle from "../components/Subtitle";
import SelectionTable from "../components/SelectionTable";
import { Color, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";

const Reports = () => {
  const navigation = useNavigation();

  const reportMenu = [
    {
      "title": "Blood Pressure",
      "action": () => navigation.navigate("ReportBloodPressure")
    },
    {
      "title": "Weight and BMI",
      "action": () => navigation.navigate("ReportWeight")
    }
  ]

  return (
    <View style={styles.frameParent}>
        <Title text={"Reports"} textColor={Color.yellow}/>
        <Subtitle text="Check the evolution of your health status" />
        <SelectionTable scrollDisabled={true} content={reportMenu} />
      </View>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingVertical: Moderate_Units.p_40,
    display: "flex",
    flexDirection: "column",
  },
});

export default Reports;
