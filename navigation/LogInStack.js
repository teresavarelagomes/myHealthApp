import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getLogInScreens } from "../utils/navigation";

// Login Stack
const LoginStack = createNativeStackNavigator();

export default function GetLogInScreens() {
    const login = getLogInScreens(LoginStack);

    return (
        <LoginStack.Navigator >
            {login}
        </LoginStack.Navigator>
    );
};