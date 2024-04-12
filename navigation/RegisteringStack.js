import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Consent from "../screens/Consent";
import RegistrationPersonalData from "../screens/RegistrationPersonalData";
import RegistrationHealthProblems from "../screens/RegistrationHealthProblems";
import AddUserHealthProblem from "../screens/AddUserHealthProblem";
import RegistrationDrugAllergy from "../screens/RegistrationDrugAllergy";
import DrugSearchSelection from "../screens/DrugSearchSelection";
import RegistrationFoodAllergy from "../screens/RegistrationFoodAllergy";
import RegistrationChronicMedication from "../screens/RegistrationChronicMedication";
import RegistrationHealthData from "../screens/RegistrationHealthData";
import AddUserHealthData from "../screens/AddUserHealthData";
import HealthIssueSearchSelection from "../screens/HealthIssueSearchSelection";
import AddUserMedication from "../screens/AddUserMedication";

// Register Stack
const RegisterStack = createNativeStackNavigator();

export default function GetRegisteringScreens({currentStep}) {

  const getScreenForStep = (step) => {
    switch (step) {
      case 1:
        return Consent;
      case 2:
        return RegistrationHealthProblems;
      case 3:
        return RegistrationChronicMedication;
      case 4:
        return RegistrationHealthData;
      default:
        return Consent;
    }
  };

  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="RegisterMainScreen"
        component={getScreenForStep(currentStep)}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="RegistrationPersonalData"
        component={RegistrationPersonalData}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="RegistrationHealthProblems"
        component={RegistrationHealthProblems}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="AddUserHealthProblem"
        component={AddUserHealthProblem}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="HealthIssueSearchSelection"
        component={HealthIssueSearchSelection}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="RegistrationDrugAllergy"
        component={RegistrationDrugAllergy}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="DrugSearchSelection"
        component={DrugSearchSelection}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="RegistrationFoodAllergy"
        component={RegistrationFoodAllergy}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="RegistrationChronicMedication"
        component={RegistrationChronicMedication}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="AddUserMedication"
        component={AddUserMedication}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="RegistrationHealthData"
        component={RegistrationHealthData}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="AddUserHealthData"
        component={AddUserHealthData}
        options={{ headerShown: false }}
      />
    </RegisterStack.Navigator>
  );
};