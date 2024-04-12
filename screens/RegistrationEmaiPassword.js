import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import GoBack from "../components/GoBack";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";
import CustomCheckBox from "../components/CustomCheckBox";
import { PasswordInput } from "../components/PasswordInput";
import { postRequest } from "../api/api";

const RegistrationEmailPassword = () => {
  const navigation = useNavigation();

  const [acceptedTermsConditions, setAcceptedTermsConditions] = useState(false);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [firstPasswordHasError, setFirstPasswordHasError] = useState(true);
  const [secondPassword, setSecondPassword] = useState('');
  const [registry, setRegistry] = useState({
      "email": "",
      "password": "",
  });
  const [firstErrorMessage, setFirstErrorMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const onClickTermsConditions = (title, subtitle, prevChecked) => {
    setAcceptedTermsConditions(!prevChecked);
  };

  const onClickPrivacyPolicy = (title, subtitle, prevChecked) => {
    setAcceptedPrivacyPolicy(!prevChecked);
  };

  const onFirstPasswordValueChangeHandler = (value) => {
    setRegistry({...registry, password: value});
    validatePassword(value);
  };

  const onEmailChangeHandler = (value) => {
    validateEmailFormat(value) && setRegistry({
      ...registry, 
      email: value 
    });
  };

  const validateEmailFormat = (email) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValid = reg.test(email);
    setIsEmailValid(isEmailValid);
    !isEmailValid && setEmailErrorMessage("Adicione um e-mail válido");
    return isEmailValid;
  };

  const validatePassword = (input) => {
    let newSuggestions = [];

    if (input.length < 8) {
      newSuggestions.push('Password must have at least 8 characters.\n');
    }
    if (!/\d/.test(input)) {
      newSuggestions.push('Include at least one number.\n')
    }

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push('Include at least one uppercase letter.\n')
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push('Include at least one special character.')
    }

    setFirstErrorMessage(newSuggestions);

    if (newSuggestions.length > 0) {
      setFirstPasswordHasError(true);
    } else {
      setFirstPasswordHasError(false);
    }
  };

  const OnClickSubmitButton = () => {
    register().then((success) => {
      if (success) {
        navigation.navigate("EmailConfirmation");
      }
    });
  };

  const register = async () => {

    try { 
      const response = await postRequest(`/user/register`, registry)
      return response.status == 200;
    } catch(error) {
      console.log("Error registing user: ");
      console.log(error.response);
      if (error.response.status === 400) {
        return false;
      } else if (error.response.status === 409) {
        setIsEmailValid(false);
        setEmailErrorMessage("Já existe um utilizador registado com este e-mail.");
      }
    };
  };

  const TermsConditionsComponent = () => (
    <View style={styles.checkboxTextParent}>
      <Text style={[styles.CustomCheckBoxText]}>I agree with the </Text>
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={() => Linking.openURL('http://localhost:3001/terms-and-conditions.html')}
      >
        <Text style={[styles.clickableText]}>Terms and conditions</Text>
      </TouchableOpacity>
    </View>
  );

  const PrivacyPolicyComponent = () => (
    <View style={styles.checkboxTextParent}>
      <Text style={[styles.CustomCheckBoxText]}>I agree with the </Text>
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={() => Linking.openURL('http://localhost:3001/privacy-policy.html')}
      >
        <Text style={[styles.clickableText]}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.page}>
      <View>
        <GoBack
          goBackTitle="Go back"
          onFrameGoBackPress={() => navigation.navigate("EmailLogIn")}
          back={require("../assets/back-white.png")}
          textColor={Color.lightGrey}
        />
      </View>
      <View style={styles.registrationParent}>
        <View style={[styles.textContainer, styles.bigMarginBottom]}>
          <Text style={[styles.registerText, styles.smallMarginBottom]}>Sign In</Text>
          <Text style={styles.registerSubText}>Register to continue to our application</Text>
        </View>
        <View style={[styles.smallMarginBottom]}>
          <View style={[styles.smallMarginBottom]}>
            <InputField
              hasError={!isEmailValid && !firstPasswordHasError && registry.password === secondPassword}
              errorMessage={emailErrorMessage}
              placeholder={"E-mail"}
              onChangeText={onEmailChangeHandler}
              autoComplete={"email"}
            />
            <PasswordInput
              value={registry.password}
              hasError={firstPasswordHasError}
              errorMessage={firstErrorMessage}
              onChange={onFirstPasswordValueChangeHandler}
            />
            <PasswordInput
              value={secondPassword}
              placeholder={"Repeat password"}
              hasError={registry.password !== secondPassword}
              errorMessage={"The two passwords must be the same"}
              onChange={(value) => setSecondPassword(value)}
            />
          </View>
          <View>
            <CustomCheckBox
              checkBoxTextComponent={<TermsConditionsComponent />}
              onCheckboxSelection={onClickTermsConditions}
            />
            <CustomCheckBox
              checkBoxTextComponent={<PrivacyPolicyComponent />}
              onCheckboxSelection={onClickPrivacyPolicy}
            />
          </View>
        </View>
        {isEmailValid && !firstPasswordHasError && registry.password === secondPassword && acceptedTermsConditions && acceptedPrivacyPolicy && <View style={[styles.bigMarginBottom]}>
          <SubmitButton
            text={"Register now"}
            onPressButton={OnClickSubmitButton}
          />
        </View>}
      </View>
    </View>
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
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  smallMarginBottom: {
    marginBottom: Moderate_Units.p_10,
  },
  bigMarginBottom: {
    marginBottom: Moderate_Units.p_15,
  },
  checkboxTextParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  clickableText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    color: Color.orange,
    textDecorationLine: 'underline',
  },
  CustomCheckBoxText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    color: Color.lightGrey,
  },
  registrationParent: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  registerText: {
    fontFamily: FontFamily.title,
    fontSize: FontSize.fs_40,
    color: Color.orange,
  },
  registerSubText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_16,
    color: Color.lightGrey,
    textAlign: "center",
  },
});

export default RegistrationEmailPassword;
