import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import NotificationList from "../components/NotificationList";
import { Color, Moderate_Units } from "../GlobalStyles";
import { useNotification } from "../context/NotificationProvider";

const Notifications = () => {
  const navigation = useNavigation();

  const { notifications } = useNotification();

  return (
    <View style={styles.frameParent}>
      <GoBack
        goBackTitle="Notifications"
        onFrameGoBackPress={() =>
          navigation.navigate("DisplayScreen")
        }
        back={require("../assets/back-grey.png")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={[styles.whiteBubble, styles.parentBox]}>
          <NotificationList 
            data={notifications} 
          />
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  frameScrollViewContent: {
    paddingBottom: Moderate_Units.p_30,
  },
  parentBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  whiteBubble: {
    marginTop: Moderate_Units.p_10,
    padding: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  frameParent: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: Moderate_Units.p_40,
    paddingHorizontal: Moderate_Units.p_16,
    backgroundColor: Color.veryLightGrey,
  },
});

export default Notifications;
