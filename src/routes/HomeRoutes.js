import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import TransferScreen from "../screens/TransferScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import BankStatementScreen from "../screens/BankStatementScreen";
import LogIn from "../screens/LogIn";

const Stack = createNativeStackNavigator();

export default function HomeRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarItemStyle: styles.tabBarItem,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
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

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 0,
        height: 80,
        backgroundColor: "white",
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderWidth: 1,
        borderColor: "#ddd",
        borderTopWidth: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
        elevation: 3,
    },
    tabBarLabel: {
        fontSize: 10,
        fontFamily: "MontserratBold",
    },
    tabBarItem: {
        paddingVertical: 5,
    },
});
