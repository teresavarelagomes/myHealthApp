
import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";

const Registry = (props) => {

  return (
    <View style= {styles.frameElement}>
    <Text style={styles.parameterDisplay}>
      <Text style={[styles.parameter]}>
        {props.parameter}
      </Text>
      <Text>{` `}</Text>
      <Text style={styles.parameterUnit}>{props.unit}</Text>
    </Text>
    <View style={styles.valueDisplay}>
      <Text style={styles.value}>{props.value}</Text>
      <Image
        style={styles.ellipse}
        contentFit="cover"
        source={props.ellipse}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
 frameElement: {
    paddingTop: 5,
    paddingBottom: 3,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  parameter: {
    fontFamily: FontFamily.subtitle,
    color: Color.orange,
    fontSize: FontSize.fs_16,
  },
  parameterDisplay: {
    textAlign: "left",
  },
  parameterUnit: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_12,
    color: Color.lightGrey,
  },
  valueDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    textAlign: "center",
    color: Color.darkGrey,
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_20,
  },
  ellipse: {
    width: Moderate_Units.p_15,
    height: Moderate_Units.p_15,
    marginLeft: Moderate_Units.p_10,
  }
});

export default Registry;