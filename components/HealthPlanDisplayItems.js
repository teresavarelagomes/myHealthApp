import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text
} from "react-native";
import { Color, FontSize, FontFamily, Moderate_Units } from "../GlobalStyles";
import HealthPlanDisplayCard from "./HealthPlanDisplayCard";
import { getPrettyDayAfter } from "../utils/date";
import { useHealthProgram } from "../context/HealthProgramProvider";

const HealthPlanDisplayItems = ({ data }) => {

  const { healthProgramStartDate } = useHealthProgram();

  const renderItem = ({ item }) => {
      return <HealthPlanDisplayCard
        title={item.title}
        authors={item.subtitle}
        previewText={item.body}
        date={getPrettyDayAfter(healthProgramStartDate, item.dayToPublish)}
        image={item.imageUri}
        video={item.videoUri}
      />;
  };

  if (data?.length > 0) {
    return (
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
      />
    )
  } else {
    return (<View style={styles.emptyMessageParent}>
      <Text style={styles.emptyMessage}>There are no articles to show at this time.</Text>
    </View>)
  }
};

const styles = StyleSheet.create({
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

export default HealthPlanDisplayItems;
