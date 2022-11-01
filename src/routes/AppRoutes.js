import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

export default function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName= 'SignUp'
            screenOptions={{headerShown: false}}>

                <Stack.Screen name='SignUp' component={SignUp}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}
