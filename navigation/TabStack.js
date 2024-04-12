import React from "react";
import {
    View,
    Pressable,
  } from "react-native";
import { StackActions } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GetTabMenuScreens from "./MenuStack";
import GetTabMainScreens from "./MainStack";
import GetTabBiometricScreens from "./BiometricStack";
import GetTabReportsScreens from "./ReportsStack";
import GetTabMedicationScreens from "./MedicationStack";
import InactiveDrugButton from "../components/InactiveDrugButton";
import ActiveDrugButton from "../components/ActiveDrugButton";
import InactiveReportButton from "../components/InactiveReportButton";
import ActiveReportButton from "../components/ActiveReportButton";
import InactiveHomeButton from "../components/InactiveHomeButton";
import ActiveHomeButton from "../components/ActiveHomeButton";
import InactiveHeartButton from "../components/InactiveHeartButton";
import ActiveHeartButton from "../components/ActiveHeartButton";
import InactiveMenuButton from "../components/InactiveMenuButton";
import ActiveMenuButton from "../components/ActiveMenuButton";
import { Moderate_Units } from "../GlobalStyles";

//Tab 
const Tab = createBottomTabNavigator();

export default function BottomTabsRoot() {
  const [bottomTabItemsNormal] = React.useState([
    <InactiveMenuButton />,
    <InactiveHeartButton />,
    <InactiveHomeButton />,
    <InactiveReportButton />,
    <InactiveDrugButton />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <ActiveMenuButton />,
    <ActiveHeartButton />,
    <ActiveHomeButton />,
    <ActiveReportButton />,
    <ActiveDrugButton />,
  ]);

  return (
    <Tab.Navigator
      initialRouteName="TabMainScreens"
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              backgroundColor: "#fff",
              shadowColor: "rgba(0, 0, 0, 0.10)",
              shadowOffset: {
                width: 10,
                height: 0,
              },
              shadowRadius: 4,
              elevation: 4,
              shadowOpacity: 1,
              height: Moderate_Units.p_45,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: Moderate_Units.p_16,
            }}
          >
            {bottomTabItemsNormal.map((item, index) => {
              const isFocused = state.index === index;

              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (isFocused) {
                      navigation.dispatch(StackActions.popToTop());
                    } else {
                      navigation.navigate({
                        name: state.routes[index].name,
                        merge: true,
                      });
                    }
                  }}
                >
                  {activeIndex === index
                    ? bottomTabItemsActive[index] || item
                    : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen
        name="TabMenuScreens"
        component={GetTabMenuScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TabBiometricScreens"
        component={GetTabBiometricScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TabMainScreens"
        component={GetTabMainScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TabReportsScreens"
        component={GetTabReportsScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TabMedicationScreens"
        component={GetTabMedicationScreens}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}