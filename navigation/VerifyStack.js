import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getVerifyScreens } from "../utils/navigation";

// Verify Stack
const VerifyStack = createNativeStackNavigator();

export default function GetVerifyScreens() {
    const verify = getVerifyScreens(VerifyStack);

    return (
        <VerifyStack.Navigator>
            {verify}
        </VerifyStack.Navigator>
    );
};