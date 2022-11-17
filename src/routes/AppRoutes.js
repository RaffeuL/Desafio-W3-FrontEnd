import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import TransferScreen from "../screens/TransferScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import BankStatementScreen from "../screens/BankStatementScreen";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
