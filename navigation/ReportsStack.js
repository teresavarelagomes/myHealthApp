import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getReportsScreens } from "../utils/navigation";

// Reports Stack
const ReportsStack = createNativeStackNavigator();

export default function GetTabReportsScreens() {
    const reports = getReportsScreens(ReportsStack);

  return (
    <ReportsStack.Navigator>
      {reports}
    </ReportsStack.Navigator>
  );
};