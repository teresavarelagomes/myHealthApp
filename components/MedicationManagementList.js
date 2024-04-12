import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import ManagementItem from "./ManagementItem";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { getFrequency } from "../utils/medication";

const MedicationManagementList = ({data, isDeleteAvailable, onDeleteHandler}) => {
  if (data?.length > 0) {
    return (<FlatList
      scrollEnabled={false}
      data={data}
      renderItem={({ item }) => <ManagementItem
        id={item.id}
        title={item.commercialName}
        subtitle={getFrequency(item.frequency)}
        hasDelete={isDeleteAvailable}
        onDeleteHandler={onDeleteHandler}
        />}
    />)
  } else {
    return (<View style={styles.emptyMessageParent}>
      <Text style={styles.emptyMessage}>No medication to manage. Please add some medication first.</Text>
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

export default MedicationManagementList;
