import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";
import SubmitButton from "../components/SubmitButton";
import { PasswordInput } from "../components/PasswordInput";
import { moderateScale } from 'react-native-size-matters';
import { useAuth } from "../context/AuthProvider";
import { postRequest } from "../api/api";

const EmailLogIn = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [loginInData, setLoginInData] = useState({
    "email": "",
    "password": "",
  });
  const [logInFailed, setLogInFailed] = useState(false); 

  const OnClickSubmitButton = () => {
    restLogIn().then(({success, response}) => {
      if (success) {
        login({accessToken : response.accessToken, refreshToken : response.refreshToken});
      }
    });
  };

  const restLogIn = async () => {
    //Log in
    try { 
      const response = await postRequest(`/user/login`, loginInData)
      if (response.status === 200) {
        return { success: true, response: response.data};
      }
    } catch(error) {
      console.log("Error logging in: ");
      console.log(error.response);      

      if (error.response.status === 400) {
        setLogInFailed(true);
        return false;
      }
    };
  };

  const onEmailChangeHandler = (value) => {
    logInFailed && setLogInFailed(false);

    setLoginInData({
      ...loginInData, 
      email: value 
    });
  };

  const onPasswordChangeHandler = (value) => {
    logInFailed && setLogInFailed(false);

    setLoginInData({
      ...loginInData, 
      password: value 
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={styles.emailLogIn}>
        <ImageBackground
          style={[styles.appLogoIcon, styles.bigMarginBottom]}
          resizeMode="cover"
          source={require("../assets/app_logo_image.png")}
        />
        <View style={[styles.textContainer, styles.bigMarginBottom]}>
          <Text style={[styles.welcomeText]}>Welcome</Text>
        </View>
        <View style={[styles.bigMarginBottom]}>
          <InputField
            placeholder={"Username or Email"}
            onChangeText={text => onEmailChangeHandler(text)}
            autoComplete={"email"}
          />
          <PasswordInput
            hasError={logInFailed}
            errorMessage={"The password is incorrect for this user. Please try again."}
            onChange={text => onPasswordChangeHandler(text)}
          />
          <TouchableOpacity
            style={styles.forgotContainer}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            <Text style={[styles.forgotText]}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bigMarginBottom]}>
          <SubmitButton
            disabled={loginInData === undefined || loginInData.email === '' || loginInData.password === ''}
            text={"Log In"}
            onPressButton={OnClickSubmitButton}
          />
        </View>
        <View style={styles.newAccountParent}>
          <Text style={[styles.noAccountText]}>No account?</Text>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.navigate("RegistrationEmaiPassword")}
          >
            <Text style={[styles.registrationText]}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.colorWhite,
    paddingVertical: Moderate_Units.p_40,
    paddingHorizontal: Moderate_Units.p_16,
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  appLogoIcon: {
    width: moderateScale(106),
    height: moderateScale(100),
    alignSelf: "center"
  },
  bigMarginBottom: {
    marginBottom: Moderate_Units.p_20,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  welcomeText: {
    fontFamily: FontFamily.title,
    fontSize: FontSize.fs_40,
    color: Color.orange,
  },
  newAccountParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  forgotText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_13,
    color: Color.orange,
    textDecorationLine: 'underline',
  },
  registrationText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    color: Color.orange,
    textDecorationLine: 'underline',
  },
  forgotContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  noAccountText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    color: Color.lightGrey,
    marginRight: Moderate_Units.p_5
  },
});

export default EmailLogIn;
