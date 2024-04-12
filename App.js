import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import Splashscreen from "./screens/Splashscreen";
import GetLogInScreens from "./navigation/LogInStack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import GetRegisteringScreens from "./navigation/RegisteringStack";
import BottomTabsRoot from "./navigation/TabStack";
import BiometricProvider, { useBiometric } from "./context/BiometricProvider";
import HealthProgramProvider, { useHealthProgram } from "./context/HealthProgramProvider";
import GetVerifyScreens from "./navigation/VerifyStack";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import { default as theme } from './custom-theme.json'; // <-- Import app theme
import MedicationProvider from "./context/MedicationProvider";
import TasksProvider from "./context/TaksProvider";
import NotificationProvider, { useNotification } from "./context/NotificationProvider";

const App = () => {

  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  const [fontsLoaded, error] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 3000);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          {hideSplashScreen ? <MainNavigator /> : <Splashscreen />}
        </NavigationContainer>
      </ApplicationProvider>
    </AuthProvider>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, isVerified, isComplete, statusStep } = useAuth();

  return (isLoggedIn ? isVerified ? (isComplete ? <LogInNavigator /> : <RegisterNavigator profileStep={statusStep} />)
    : <GetVerifyScreens /> : <GetLogInScreens />
  );
};

const RegisterNavigator = ({ profileStep }) => {
  return (
    <HealthProgramProvider>
      <GetRegisteringScreens currentStep={profileStep} />
    </HealthProgramProvider>
  );
}

const LogInNavigator = () => {
  return (
    <HealthProgramProvider>
      <BiometricProvider>
        <MedicationProvider>
          <TasksProvider>
            <NotificationProvider>
              <DisplayScreenNavigator />
            </NotificationProvider>
          </TasksProvider>
        </MedicationProvider>
      </BiometricProvider>
    </HealthProgramProvider>
  );
};

const DisplayScreenNavigator = () => {
  const { stateLoading } = useBiometric();
  const { healthLoading, isHealthProgramActive } = useHealthProgram();
  const { isNotificationLoading } = useNotification();

  return (
    stateLoading || healthLoading || isNotificationLoading ? <Splashscreen /> : <BottomTabsRoot />
  );
};

export default App;
