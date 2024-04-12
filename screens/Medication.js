import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import ClickableTitle from "../components/ClickableTitle";
import Subtitle from "../components/Subtitle";
import { Color, Moderate_Units } from "../GlobalStyles";
import DisplayNextMedication from "../components/DisplayNextMedication";
import Title from "../components/Title";
import { useMedication } from "../context/MedicationProvider";

const Medication = () => {
  const { dailyMedication, isMedicationLoading } = useMedication();

  return (
    <View style={styles.frameParent}>
      <Title text={"Medication"} textColor={Color.yellow}/>
      <View style={styles.subtitle}>
      <Subtitle text="Review and validate your daily medication" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={[styles.whiteBubble, styles.parentBox]}>
        {isMedicationLoading ? <LoadingSpinner /> : <DisplayNextMedication medication={dailyMedication} />}
        </View>
        <View style={styles.parentClickableTitle}>
          <ClickableTitle title={"Manage medication"} navigationPage={"ManageMedication"} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: Moderate_Units.p_10,
  },
  frameScrollViewContent: {
    paddingBottom: Moderate_Units.p_55,
  },
  parentClickableTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Moderate_Units.p_10,
  },
  parentBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
        shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  whiteBubble: {
    padding: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
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

export default Medication;
