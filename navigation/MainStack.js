import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getBiometricScreens, getCommunityScreens, getHealthPlansScreens, getDisplayScreens, getMedicationScreens } from "../utils/navigation";

// Main Stack
const MainStack = createNativeStackNavigator();

export default function GetTabMainScreens() {
  const display = getDisplayScreens(MainStack);
  const comunity = getCommunityScreens(MainStack);
  const healthPlans = getHealthPlansScreens(MainStack);
  const medication = getMedicationScreens(MainStack);
  const biometric = getBiometricScreens(MainStack);
  
  return (
    <MainStack.Navigator>
      {display}
      {comunity}
      {healthPlans}
      {medication}
      {biometric}
    </MainStack.Navigator>
  );
};