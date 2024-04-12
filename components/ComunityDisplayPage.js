import React from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import GoBack from "./GoBack";
import { scale, verticalScale } from "react-native-size-matters";

const ComunityDisplayPage = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Go back"
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <View style={styles.titleParent}>
        <Text style={styles.titleText}>{route.params.title}</Text>
        {route.params.subtitle && <Text style={[styles.subtitleText]}>
          {route.params.subtitle}
        </Text>}
      </View>
        <View style={styles.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.frameScrollViewContent}
        >
          {route.params.image && <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={{ uri: route.params.image }}
          />}
          <View style={[styles.locationParent]}>
            <Image
              style={styles.locationIcon}
              contentFit="cover"
              source={require("../assets/location.png")}
            />
            <Text style={[styles.locationText]}>
              {route.params.location}
            </Text>
          </View>
          <Text
            style={styles.contentText}
          >
            {route.params.content}
          </Text>
        </ScrollView>
        <View/>
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
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingTop: Moderate_Units.p_40,
    flex: 1,
  },
  titleParent: {
    marginVertical: Moderate_Units.p_10,
  },
  locationParent: {
    display: "flex",
    flexDirection: "row",
    marginVertical: Moderate_Units.p_10,
  },
  frameScrollViewContent: {
    paddingBottom: Moderate_Units.p_15,
  },
  flex: {
    flex: 1,
  }, 
  locationText: {
    fontSize: FontSize.fs_12,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginLeft: Moderate_Units.p_2,
    color: Color.orange,
  },
  contentText: {
    fontSize: FontSize.fs_12,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginLeft: Moderate_Units.p_2,
    color: Color.darkGrey,
  },
  titleText: {
    fontSize: FontSize.fs_25,
    fontFamily: FontFamily.title,
    color: Color.orange,
    textAlign: "left",
    fontWeight: "700",
    alignSelf: "stretch",
    marginBottom: Moderate_Units.p_5,
  },
  subtitleText: {
    fontSize: FontSize.fs_12,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    color: Color.lightGrey,
    marginBottom: Moderate_Units.p_5
  },
  image: {
    alignSelf: "center",
    width: scale(330),
    height: verticalScale(180),
  },
  locationIcon: {
    width: Moderate_Units.p_11,
    height: Moderate_Units.p_11,
  },
});

export default ComunityDisplayPage;