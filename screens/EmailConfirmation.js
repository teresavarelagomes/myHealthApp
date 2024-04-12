import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import SubmitButton from "../components/SubmitButton";
import { scale, verticalScale } from 'react-native-size-matters';
import { postRequest } from "../api/api";
import { useAuth } from "../context/AuthProvider";

const EmailConfirmation = () => {
  const navigation = useNavigation();

  const { userId } = useAuth();

  const OnClickSubmitButton = () => {
    getNewCode().then((success) => {
      if (success) {
        navigation.navigate("EmailLogIn");
      }
    });
  };

  const getNewCode = async () => {

    try { 
      const response = await postRequest(`/user/${userId}/verification_code`, {})
      return response.status == 200;
    } catch(error) {
      console.log("Error getting new verification code: ");
      console.log(error.response);
    };
  };

  return (
    <View style={styles.logout}>
          <View style={styles.textContainer}>
            <Image
              style={styles.keyIcon}
              contentFit="cover"
              source={require("../assets/mail.png")}
            />
            <Text style={styles.welcome1}>
              Verify account
            </Text>
            <Text style={styles.welcome2}>
              Check your email account through the link sent to your email
            </Text>
          </View>
          <View>
          <SubmitButton 
            text={"Confirm"} 
            color={Color.colorWhite}
            textColor={Color.orange}
            onPressButton={() => navigation.navigate("EmailLogIn")} 
          />
          <SubmitButton 
            text={"Resend email"}
            onPressButton={OnClickSubmitButton} 
          />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyIcon: {
    width: scale(87),
    height: verticalScale(60),
  },
  welcome1: {
    fontSize: FontSize.fs_35,
    fontFamily: FontFamily.title,
    color: Color.yellow,
    marginTop: Moderate_Units.p_5,
  },
  welcome2: {
    fontSize: FontSize.fs_16,
    color: Color.colorWhite,
    fontFamily: FontFamily.subtitle,
    marginTop: Moderate_Units.p_5,
    textAlign: "center"
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: Moderate_Units.p_20,
  },
  logout: {
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

export default EmailConfirmation;
