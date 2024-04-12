import React from "react";
import { Text, TextInput, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";

//inputMode is an enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url')
//autoComplete is an enum(additional-name, address-line1, address-line2, birthdate-day (iOS 17+),birthdate-full (iOS 17+), birthdate-month (iOS 17+), birthdate-year (iOS 17+), cc-csc (iOS 17+), cc-exp (iOS 17+), cc-exp-day (iOS 17+), cc-exp-month (iOS 17+), cc-exp-year (iOS 17+), cc-number, country, current-password, email, family-name, given-name, honorific-prefix, honorific-suffix, name, new-password, off, one-time-code, postal-code, street-address, tel, username)

const InputField = ({
  title,
  name,
  value,
  placeholder,
  onChangeText,
  inputMode,
  hasError,
  errorMessage,
  autoComplete,
  hideInput,
  hasDelete,
  onDelete,
  index,
}) => {

  const onClickGarbageButton = () => {
    onDelete(index);
  };

  return (
    <View style={styles.parentInputField}>
      {title && <Text style={[styles.title]}>
        {title}
      </Text>}
      <View style={styles.horizontal}>
        <View style={[styles.stretch, hasDelete && styles.deletable]}>
          <TextInput
            style={styles.textInput}
            defaultValue={value}
            placeholder={placeholder}
            onChangeText={(e) => onChangeText(e, index || name)}
            inputMode={inputMode}
            autoComplete={autoComplete}
            secureTextEntry={hideInput}
            autoCorrect={false}
            placeholderTextColor={Color.darkGrey}
          />
        </View>
        {hasDelete &&
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={onClickGarbageButton}
          >
            <Image
              contentFit="cover"
              source={require("../assets/frame-35911.png")}
            />
          </TouchableOpacity>
        }
      </View>
      {hasError && <Text style={[styles.errorText]}>
        {errorMessage || "The field above contains an error"}
      </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: Moderate_Units.p_2,
    fontFamily: FontFamily.subtitle,
    color: Color.red
  },
  parentInputField: {
    marginVertical: Moderate_Units.p_8,
  },
  stretch: {
    flex: 1,
  },
  deletable: {
    marginRight: Moderate_Units.p_8,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginBottom: Moderate_Units.p_2,
  },
  textInput: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_14,
    borderRadius: Moderate_Units.p_10,
    borderColor: Color.lightGrey,
    borderWidth: Moderate_Units.p_05,
    backgroundColor: Color.colorWhite,
    color: Color.darkGrey,
    paddingVertical: Moderate_Units.p_5,
    paddingHorizontal: Moderate_Units.p_13,
    height: Moderate_Units.p_40,
  },
});

export default InputField;