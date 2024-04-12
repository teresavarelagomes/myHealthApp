import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import Subtitle from "../components/Subtitle";
import { useNavigation } from "@react-navigation/native";
import { Color, Moderate_Units } from "../GlobalStyles";
import SelectionTable from "../components/SelectionTable";
import Title from "../components/Title";

const BiometricReadingSelection = () => {
  const navigation = useNavigation();

  const biometricReadingMenu = [
    {
      title: "Blood Pressure",
      action: () => navigation.navigate("AddManualBPReading"),
    },
    {
      title: "Weight",
      action: () => navigation.navigate("AddManualWeightReading"),
    },
  ];

  return (
    <View style={styles.frameParent}>
       <Title text={"Biometric Readings"} textColor={Color.yellow}/>
       <Subtitle text="Add biometric data for blood pressure and weight" />
       <SelectionTable scrollDisabled={true} content={biometricReadingMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentClickableTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Moderate_Units.p_8,
  },
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

export default BiometricReadingSelection;
