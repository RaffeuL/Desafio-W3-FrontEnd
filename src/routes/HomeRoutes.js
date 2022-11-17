import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import TransferScreen from "../screens/TransferScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import BankStatementScreen from "../screens/BankStatementScreen";
import LogIn from "../screens/LogIn";

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function HomeRoutes() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "black" },
                headerTitleStyle: { color: "white" },
                headerIconColor: "#484848",
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back"
                            size={26}
                            color="white"
                        />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="TransferScreen" component={TransferScreen} />
            <Stack.Screen name="GiftCardScreen" component={GiftCardScreen} />
            <Stack.Screen
                name="BankStatementScreen"
                component={BankStatementScreen}
            />
            <Stack.Screen name="LogIn" component={LogIn} />
        </Stack.Navigator>
    );
}
