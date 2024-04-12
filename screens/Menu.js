import React from "react";
import { View, Linking, ScrollView, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuList from "../components/MenuList";
import { Moderate_Units, Color, FontFamily, FontSize } from "../GlobalStyles";

const Menu = () => {
  const navigation = useNavigation();

  const firstMenu = [
    {
      title: "Main Page",
      iconSource: require("../assets/home_grey.png"),
      action: () =>
      navigation.navigate("TabMainScreens", {screen: "DisplayScreen"}),
    },
    {
      title: "Personal data",
      iconSource: require("../assets/face.png"),
      action: () => navigation.navigate("EditPersonalData"),
    },
    {
      title: "My Medication",
      iconSource: require("../assets/drug_grey.png"),
      action: () =>
        navigation.navigate("TabMedicationScreens", {screen: "Medication"}),
    },
    {
      title: "Biometric Readings",
      iconSource: require("../assets/heart_grey.png"),
      action: () =>
        navigation.navigate("TabBiometricScreens", {screen: "BiometricReadingSelection"}),
    },
    {
      title: "Reports",
      iconSource: require("../assets/report_grey.png"),
      action: () =>
      navigation.navigate("TabReportsScreens", {screen: "Reports"}),
    },
    {
      title: "Comunity",
      iconSource: require("../assets/comunity_grey.png"),
      action: () => navigation.navigate("Comunity"),
    },
    {
      title: "Health Plan",
      iconSource: require("../assets/plan_grey.png"),
      action: () =>
        navigation.navigate("HealthPlans"),
    },
    {
      title: "Log out",
      iconSource: require("../assets/logout_grey.png"),
      action: () =>
        navigation.navigate("Logout"),
    },
  ]

  const secondMenu = [
    {
      title: "About us",
      iconSource: require("../assets/sheet_grey.png"),
      action: () =>  Linking.openURL('http://localhost:3001'),
    }, {
      title: "Privacy policy",
      iconSource: require("../assets/sheet_grey.png"),
      action: () =>  Linking.openURL('http://localhost:3001/privacy-policy.html'),

    }, {
      title: "Terms and Conditions",
      iconSource: require("../assets/sheet_grey.png"),
      action: () =>  Linking.openURL('http://localhost:3001/terms-and-conditions.html'),
    },
  ];

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={[styles.whiteBubble, styles.parentBox]}>
          <MenuList menuContent={firstMenu} scrollDisabled={true} />
        </View>
        <Text style={[styles.abousUs, styles.greyText]}>About us</Text>
        <View style={[styles.whiteBubble, styles.parentBox]}>
        <MenuList menuContent={secondMenu} scrollDisabled={true} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingTop: Moderate_Units.p_40,
  },
  frameScrollViewContent: {
    paddingBottom: 40
  },
  whiteBubble: {
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  parentBox: {
    marginTop: Moderate_Units.p_10,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
        shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  greyText: {    
    marginTop: Moderate_Units.p_10,
    color: Color.lightGrey,
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_12,
    alignSelf: "stretch",
  },
  abousUs: {
    paddingTop: 5,
    textAlign: "left",
  },
});

export default Menu;
