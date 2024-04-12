import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Subtitle from "../components/Subtitle";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";
import SubmitButton from "../components/SubmitButton";

const introMessage = "Introduction message";
const dataConsent = `Data consent message`;
const revoguingRights = "Revoguing rights message";

const Consent = () => {
  const navigation = useNavigation();

  const ConsentText = () => (
    <View>
      <Text style={[styles.text]}>
        {introMessage}
      </Text>
      <Subtitle text="Data consent" />
      <Text style={[styles.text]}>
        {dataConsent}
      </Text>
      <Subtitle text="Right to object" />
      <Text style={[styles.text]}>
        {revoguingRights}
      </Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <Title text={"Consentimento"} />
        <Subtitle text="Before proceeding, please read carefully:" />
        <ConsentText />
        <View style={styles.marginTop}>
         <SubmitButton text={"Accept"} onPressButton={() => navigation.navigate("RegistrationPersonalData")} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: Moderate_Units.p_20,
  },
  text: {
    textAlign: "justify",
    color: Color.darkGrey,
    fontSize: FontSize.fs_15,
    fontFamily: FontFamily.subtitle,
  },
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.colorWhite,
    paddingHorizontal: Moderate_Units.p_16,
    paddingTop: Moderate_Units.p_40,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  marginTop: {
    marginTop: Moderate_Units.p_10,
  },
});

export default Consent;
