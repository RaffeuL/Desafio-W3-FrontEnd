import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import TransferScreen from "../screens/TransferScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import BankStatementScreen from "../screens/BankStatementScreen";

const Tab = createBottomTabNavigator();

export default function TabHome() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarItemStyle: styles.tabBarItem,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="TransferScreen" component={TransferScreen} />
            <Tab.Screen name="GiftCardScreen" component={GiftCardScreen} />
            <Tab.Screen
                name="BankStatementScreen"
                component={BankStatementScreen}
            />
        </Tab.Navigator>
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
