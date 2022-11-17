import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import HomeRoutes from "./HomeRoutes";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeRoutes"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
