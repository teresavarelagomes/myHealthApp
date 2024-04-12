import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";
import SubmitButton from "../components/SubmitButton";
import { scale, verticalScale } from 'react-native-size-matters';
import { useAuth } from "../context/AuthProvider";

const Logout = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <Image
          style={styles.keyIcon}
          contentFit="cover"
          source={require("../assets/key.png")}
        />
        <Text style={styles.mainText}>
          Log out
        </Text>
        <Text style={styles.subText}>
          Are you sure you want to log out?
        </Text>

      </View>
      <View>
        <SubmitButton
          text={"Yes"}
          color={Color.colorWhite}
          textColor={Color.orange}
          onPressButton={() => logout()}
        />
        <SubmitButton
          text={"No"}
          onPressButton={() => navigation.goBack()}
          removeShadow={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyIcon: {
    width: scale(100),
    height: verticalScale(100),
  },
  mainText: {
    fontSize: FontSize.fs_35,
    fontFamily: FontFamily.title,
    color: Color.yellow,
    marginTop: Moderate_Units.p_5,
  },
  subText: {
    fontSize: FontSize.fs_16,
    color: Color.colorWhite,
    fontFamily: FontFamily.subtitle,
    marginTop: Moderate_Units.p_5,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: Moderate_Units.p_20,
  },
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.orange,
    paddingHorizontal: Moderate_Units.p_16,
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
});

export default Logout;
