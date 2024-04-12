
import ComunityDisplayPage from "../components/ComunityDisplayPage";import BiometricReadingSelection from "../screens/BiometricReadingSelection";
import Comunity from "../screens/Comunity";
import HealthPlanDisplayPage from "../screens/HealthPlanDisplayPage";
import HealthPlans from "../screens/HealthPlans";
import ComunityCategory from "../screens/ComunityCategory";
import Reports from "../screens/Reports";
import ReportBloodPressure from "../screens/ReportBloodPressure";
import ReportWeight from "../screens/ReportWeight";
import Medication from "../screens/Medication";
import ManageMedication from "../screens/ManageMedication";
import AddUserMedication from "../screens/AddUserMedication";
import DrugSearchSelection from "../screens/DrugSearchSelection";
import EmailLogIn from "../screens/EmailLogIn";
import RecoverPassword from "../screens/RecoverPassword";
import RegistrationEmailPassword from "../screens/RegistrationEmaiPassword";
import EmailConfirmation from "../screens/EmailConfirmation";
import DisplayScreen from "../screens/DisplayScreen";
import Notifications from "../screens/Notifications";
import MotivationalMessage from "../screens/MotivationalMessage";
import AddManualWeightReading from "../screens/AddManualWeightReading";
import AddManualBPReading from "../screens/AddManualBPReading";

export const getBiometricScreens = (Stack) => {
    return [
        <Stack.Screen
            key="BiometricReadingSelection"
            name="BiometricReadingSelection"
            component={BiometricReadingSelection}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="AddManualWeightReading"
            name="AddManualWeightReading"
            component={AddManualWeightReading}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="AddManualBPReading"
            name="AddManualBPReading"
            component={AddManualBPReading}
            options={{ headerShown: false }}
        />
    ]
};

export const getReportsScreens = (Stack) => {
    return [
        <Stack.Screen
            key="Reports"
            name="Reports"
            component={Reports}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="ReportBloodPressure"
            name="ReportBloodPressure"
            component={ReportBloodPressure}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="ReportWeight"
            name="ReportWeight"
            component={ReportWeight}
            options={{ headerShown: false }}
        />
    ]
};

export const getMedicationScreens = (Stack) => {
    return [
        <Stack.Screen
            key="Medication"
            name="Medication"
            component={Medication}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="ManageMedication"
            name="ManageMedication"
            component={ManageMedication}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="AddUserMedication"
            name="AddUserMedication"
            component={AddUserMedication}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="DrugSearchSelection"
            name="DrugSearchSelection"
            component={DrugSearchSelection}
            options={{ headerShown: false }}
        />
    ]
};

export const getCommunityScreens = (Stack) => {
    return [
        <Stack.Screen
            key="Comunity"
            name="Comunity"
            component={Comunity}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="ComunityCategory"
            name="ComunityCategory"
            component={ComunityCategory}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="ComunityDisplayPage"
            name="ComunityDisplayPage"
            component={ComunityDisplayPage}
            options={{ headerShown: false }}
        />
    ];
};

export const getHealthPlansScreens = (Stack) => {
    return [
        <Stack.Screen
            key="HealthPlans"
            name="HealthPlans"
            component={HealthPlans}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="HealthPlanDisplayPage"
            name="HealthPlanDisplayPage"
            component={HealthPlanDisplayPage}
            options={{ headerShown: false }}
        />
    ]
};

export const getLogInScreens = (Stack) => {
    return [
        <Stack.Screen
            key="EmailLogIn"
            name="EmailLogIn"
            component={EmailLogIn}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="RecoverPassword"
            name="RecoverPassword"
            component={RecoverPassword}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="RegistrationEmaiPassword"
            name="RegistrationEmaiPassword"
            component={RegistrationEmailPassword}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="EmailConfirmation"
            name="EmailConfirmation"
            component={EmailConfirmation}
            options={{ headerShown: false }}
        />,
    ]
};

export const getVerifyScreens = (Stack) => {
    return [
        <Stack.Screen
            key="EmailConfirmation"
            name="EmailConfirmation"
            component={EmailConfirmation}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="EmailLogIn"
            name="EmailLogIn"
            component={EmailLogIn}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="RecoverPassword"
            name="RecoverPassword"
            component={RecoverPassword}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="RegistrationEmaiPassword"
            name="RegistrationEmaiPassword"
            component={RegistrationEmailPassword}
            options={{ headerShown: false }}
        />,
    ]
};

export const getDisplayScreens = (Stack) => {
    return [
        <Stack.Screen
            key="DisplayScreen"
            name="DisplayScreen"
            component={DisplayScreen}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="Notifications"
            name="Notifications"
            component={Notifications}
            options={{ headerShown: false }}
        />,
        <Stack.Screen
            key="MotivationalMessage"
            name="MotivationalMessage"
            component={MotivationalMessage}
            options={{ headerShown: false }}
        />
    ]
};