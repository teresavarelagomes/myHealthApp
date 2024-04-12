import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import SelectionTable from "../components/SelectionTable";
import { Color, Moderate_Units } from "../GlobalStyles";

const Comunity = () => {
  const navigation = useNavigation();

  const comunityMenu = [
    {
      "title": "Parks",
      "action": () => navigation.navigate("ComunityCategory", {
        category: 'Parques',
        title: "Parks",
      })
    },
    {
      "title": "Trails",
      "action": () => navigation.navigate("ComunityCategory", {
        category: 'Percursos',
        title: "Trails",
      })
    },
    {
      "title": "Next events",
      "action": () => navigation.navigate("ComunityCategory", {
        category: 'Próximos eventos',
        title: "Next events",
      })
    },
    {
      "title": "Bike lanes",
      "action": () => navigation.navigate("ComunityCategory", {
        category: 'Ciclovias',
        title: "Bike lanes",
      })
    },
    {
      "title": "Groups",
      "action": () => navigation.navigate("ComunityCategory", {
        category: 'Grupos',
        title: "Groups",
      })
    },
  ]

  return (
    <View style={styles.frameParent}>
      <View>
        <GoBack
          goBackTitle="Comunity"
          onFrameGoBackPress={() => navigation.goBack()}
          back={require("../assets/back-grey.png")}
        />
        <SelectionTable scrollDisabled={true} content={comunityMenu} />
      </View>
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
    paddingTop: Moderate_Units.p_40,
    display: "flex",
    flexDirection: "column",
  },
});

export default Comunity;