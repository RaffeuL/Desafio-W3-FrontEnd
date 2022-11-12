import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import TransferScreen from "../screens/TransferScreen";
import GiftCardScreen from "../screens/GiftCardScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName= 'GiftCardScreen'
            screenOptions={{headerShown: false}}>

                <Stack.Screen name='SignUp' component={SignUp}/>
                <Stack.Screen name='LogIn' component={LogIn}/>
                <Stack.Screen name='TransferScreen' component={TransferScreen}/>
                <Stack.Screen name='GiftCardScreen' component={GiftCardScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}
