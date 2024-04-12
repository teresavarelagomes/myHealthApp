import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getMedicationScreens } from "../utils/navigation";

// Medication Stack
const MedicationStack = createNativeStackNavigator();

export default function GetTabMedicationScreens() {
    const medication = getMedicationScreens(MedicationStack);

  return (
    <MedicationStack.Navigator>
      {medication}
    </MedicationStack.Navigator>
  );
};