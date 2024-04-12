import React, { useState } from "react";
import { RadioGroup, Radio } from "@ui-kitten/components";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontSize, FontFamily, Moderate_Units } from "../GlobalStyles";

const RadioSelection = ({ onChangeSelection, title, radioOptions, startingIndex }) => {
  const [frameRadioSelectedIndex, setframeRadioSelectedIndex] = useState(startingIndex);

  const onHandleClick = (clickedIndex) => {
    setframeRadioSelectedIndex(clickedIndex);
    onChangeSelection(clickedIndex);
  }

  return (
    <View>
      <Text style={[styles.title]}>
        {title}
      </Text>
      <RadioGroup
        style={styles.parent}
        selectedIndex={frameRadioSelectedIndex}
        onChange={(clickedIndex) => onHandleClick(clickedIndex)}
        
      >
        {radioOptions.map((radioOption) => (
          <Radio 
            key={radioOption.key}
            status='primary'
          >
            {() => <Text style={styles.frameRadioText}> {radioOption.title} </Text>}</Radio>
        ))}
      </RadioGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginBottom: Moderate_Units.p_2,
  },
  frameRadioText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_14,
    color: Color.darkGrey,
    marginLeft: Moderate_Units.p_5,
  },
  parent: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
});

export default RadioSelection;
