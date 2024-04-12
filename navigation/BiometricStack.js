import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getBiometricScreens } from "../utils/navigation";

// Biometric Stack
const BiometricStack = createNativeStackNavigator();

export default function GetTabBiometricScreens() {
  const biometric = getBiometricScreens(BiometricStack);

  return (
    <BiometricStack.Navigator>
      {biometric}
    </BiometricStack.Navigator>
  );
};