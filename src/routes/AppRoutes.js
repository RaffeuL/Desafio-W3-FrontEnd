import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import TransferScreen from "../screens/TransferScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName= 'TransferScreen'
            screenOptions={{headerShown: false}}>

                <Stack.Screen name='SignUp' component={SignUp}/>
                <Stack.Screen name='LogIn' component={LogIn}/>
                <Stack.Screen name='TransferScreen' component={TransferScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}
