import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { postRequest } from "../api/api";

const RecoverPassword = () => {
  const navigation = useNavigation();
  const [recoverEmail, setRecoverEmail] = useState({
    "email": "",
  });
  const [recoverFailed, setRecoverFailed] = useState(false);


  const onEmailChangeHandler = (value) => {
    recoverFailed && setRecoverFailed(false);
    setRecoverEmail({
      ...recoverEmail,
      email: value
    });
  };

  const OnClickSubmitButton = () => {
    recoverPassword().then((success) => {
      if (success) {
        navigation.goBack();
      }
    });
  };

  const recoverPassword = async () => {
    console.log(recoverEmail);

    //Log in
    try {
      const response = await postRequest(`/user/resetPassword`, recoverEmail)
      return response.status == 200;
    } catch (error) {
      console.log("Error resetting password: ");
      console.log(error.response);
      if (error.response.status === 400) {
        setRecoverFailed(true);
        return false;
      }
    };
  };

  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <Image
          style={styles.keyIcon}
          contentFit="cover"
          source={require("../assets/key.png")}
        />
        <Text style={styles.mainText}>
          Recover password
        </Text>
        <Text style={styles.subText}>
          Enter the email associated with your account
        </Text>

      </View>
      <View>
        <View style={styles.inputFieldParent}>
          <InputField
            placeholder={"Enter email"}
            autoComplete={"email"}
            onChangeText={(text) => onEmailChangeHandler(text)}
          />
        </View>
        <SubmitButton
          text={"Recover password"}
          disabled={recoverEmail === undefined || recoverEmail.email === ''}
          onPressButton={OnClickSubmitButton}
          color={Color.colorWhite}
          textColor={Color.orange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyIcon: {
    width: 100,
    height: 100,
  },
  mainText: {
    fontSize: FontSize.fs_35,
    fontFamily: FontFamily.title,
    color: Color.yellow,
    marginTop: Moderate_Units.p_5,
    textAlign: "center",
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
  inputFieldParent: {
    marginBottom: Moderate_Units.p_10,
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

export default RecoverPassword;
