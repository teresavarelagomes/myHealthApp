import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import GoBack from "../components/GoBack";
import { scale, verticalScale } from "react-native-size-matters";
import YoutubeVideo from "../components/YoutubeVideo";

const HealthPlanDisplayPage = ({ route }) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Go back"
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <View style={styles.titleParent}>
        <Text style={styles.titleText}>{route.params.title}</Text>
        <Text style={[styles.subtitleText]}>
          {route.params.authors}
        </Text>
      </View>
      <View style={styles.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.frameScrollViewContent}
        >
          {route.params.image && <TouchableOpacity onPress={toggleModal}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: route.params.image }}
            />
          </TouchableOpacity>}
          {route.params.video && <YoutubeVideo uri={route.params.video} />}
          <View style={[styles.locationParent]}>
            <Text style={[styles.locationText]}>
              {route.params.date}
            </Text>
          </View>
          <Text
            style={styles.contentText}
          >
            {route.params.content.replace(/<br>/g, '\n')}
          </Text>
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <Image
              style={styles.modalImage}
              resizeMode="contain"
              source={{ uri: route.params.image }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    fontSize: FontSize.fs_14,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
});

export default HealthPlanDisplayPage;
