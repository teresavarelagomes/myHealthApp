import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getBiometricScreens, getCommunityScreens, getHealthPlansScreens } from "../utils/navigation";
import Menu from "../screens/Menu";
import Logout from "../screens/Logout";
import EditPersonalData from "../screens/EditPersonalData";
import DisplayScreen from "../screens/DisplayScreen";

//Menu Stack 
const MenuStack = createNativeStackNavigator();

export default function GetTabMenuScreens() {
  const biometric = getBiometricScreens(MenuStack);
  const comunity = getCommunityScreens(MenuStack);
  const healthPlans = getHealthPlansScreens(MenuStack);

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="DisplayScreen"
        component={DisplayScreen}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="EditPersonalData"
        component={EditPersonalData}
        options={{ headerShown: false }}
      />
      {biometric}
      <MenuStack.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
      {comunity}
      {healthPlans}
    </MenuStack.Navigator>
  );
};