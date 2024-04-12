import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import NotificationItem from "./NotificationItem";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";
import { getSourceIconNotification } from "../utils/notification";
import { useNavigation } from "@react-navigation/core";
import { postRequest } from "../api/api";
import { useAuth } from "../context/AuthProvider";
import { useNotification } from "../context/NotificationProvider";

const NotificationList = ({ data }) => {
  const navigation = useNavigation();

  const { userId } = useAuth();
  const { getNotification } = useNotification();

  //notificationType is enum GENERIC, TASK, MEDICATION, TRAINING, DEVICES
  const getNotificationNavigation = (item) => {
    switch (item.type) {
      case 'GENERIC':
        //do nothing
        break;
      case 'TASK':
        navigation.navigate("Comunity");
        break;
      case 'MEDICATION':
        navigation.navigate("TabMedicationScreens", { screen: "Medication" });
        break;
      case 'TRAINING':
        navigation.navigate("HealthPlanDisplayPage", {
          title: item.title,
          date: item.date,
          image: item.imageUri,
          video: item.videoUri,
          content: item.body,
        })
        break;
      case 'DEVICES':
        navigation.navigate("TabBiometricScreens", { screen: "BiometricReadingSelection" });
        break;
      default:
        break;
      //do nothing
    }
  };

  const onClickingHandler = (item, check) => {
    check && checkNotification(item.notificationId).then((success) => {
      success && getNotification();
    });
    getNotificationNavigation(item);
  };

  const checkNotification = async (notificationId) => {
    try {
      const response = await postRequest(`/user/${userId}/notification/${notificationId}/check`, {});
      return response.status === 204;
    } catch (error) {
      console.log("Error checking notification: ");
      console.log(error.response);
    }
  };

  const renderItem = (item) => {

    return (
      <NotificationItem
        title={item.title}
        previewText={item.subtitle}
        date={item.date}
        sourceIcon={getSourceIconNotification(item.type, item.isRead)}
        isNew={!item.isRead}
        onClick={() => onClickingHandler(item, !item.isRead)}
      />
    );
  };

  if (data?.length > 0) {
    return (
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={styles.frameFlatListContent}
      />
    )
  } else {
    return (<View style={styles.emptyMessageParent}>
      <Text style={styles.emptyMessage}>There is no new notifications.</Text>
    </View>)
  };
};

const styles = StyleSheet.create({
  frameFlatListContent: {
    flexDirection: "column",
  },
  emptyMessage: {
    fontSize: FontSize.fs_12,
    color: Color.lightGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
  },
  emptyMessageParent: {
    marginTop: Moderate_Units.p_2,
  }
});

export default NotificationList;
