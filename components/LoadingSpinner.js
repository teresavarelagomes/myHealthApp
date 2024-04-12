import React from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";
import { Moderate_Units } from "../GlobalStyles";

const LoadingSpinner = ({size}) => {

  return (
    <View style={[styles.parentSpinner]}>
      <Spinner status="primary"/>
    </View>
  );
};

const styles = StyleSheet.create({
  parentSpinner: {
      marginVertical: Moderate_Units.p_15,
      alignSelf: "center"
  },
});

export default LoadingSpinner;
