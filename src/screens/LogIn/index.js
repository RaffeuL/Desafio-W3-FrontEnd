import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userLogin } from "../../services/userFeatures/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../globalComponents/Button";
import Input from "../../globalComponents/Input";

export default function LogIn() {
    const [isLoading, setIsLoading] = useState(false);

    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function tryLogin() {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                navigation.replace("HomeRoutes");
            }
            return;
        }

        tryLogin();
    });

    const navigation = useNavigation();

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    async function validate() {
        Keyboard.dismiss();

        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{6,}$/g;
        const passwordRegex = /^(?!.(.).\1)[0-9]+$/;

        if (!agency) {
            handleError("Please input your agency", "agency");
            valid = false;
        } else if (!agencyRegex.test(agency)) {
            handleError(
                "Agency cannot contain letters and should have 4 digits or less",
                "agency"
            );
            valid = false;
        }

        if (!account) {
            handleError("Please input your account", "account");
            valid = false;
        } else if (!accountRegex.test(account)) {
            handleError(
                "Account Number cannot contain letters and should have 6 digits or more",
                "account"
            );
            valid = false;
        }

        if (!password) {
            handleError("Please input your password", "password");
            valid = false;
        } else if (password.length < 6) {
            handleError(
                "The password should have more than 6 characters",
                "password"
            );
            valid = false;
        } else if (!passwordRegex.test(password)) {
            handleError(
                "The password should have only numbers and no repeated numbers",
                "password"
            );
            valid = false;
        }

        if (valid) {
            await login();
        }
    }

    async function login() {
        const tokenRequest = await userLogin({
            agency: agency,
            checking_account: account,
            password: password,
        });
        if (tokenRequest.status === "sucess") {
            await AsyncStorage.setItem("token", tokenRequest.data);
            navigation.replace("HomeRoutes");
        } else {
            switch (tokenRequest) {
                case "Request failed with status code 404":
                    Alert.alert("Error", "Invalid credentials");
                    break;
                case "Request failed with status code 401":
                    Alert.alert("Error", "Not authorized");
                    break;
            }
        }
    }
    return (
        <>
            <View style={styles.screen}>
                <Text style={styles.text}>LogIn</Text>
                <Input
                    placeholder={"Agency"}
                    onChangeText={setAgency}
                    keyboardType={"numeric"}
                    error={errors.agency}
                    onFocus={() => {
                        handleError(null, "agency");
                    }}
                />

                <Input
                    placeholder={"Account Number"}
                    onChangeText={setAccount}
                    keyboardType={"numeric"}
                    error={errors.account}
                    onFocus={() => {
                        handleError(null, "account");
                    }}
                />
                <Input
                    placeholder={"Password"}
                    onChangeText={setPassword}
                    isHide={true}
                    iconName={"lock"}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, "password");
                    }}
                />
                <Button label={"Login"} onPress={validate}></Button>
                <Text
                    style={styles.textLink}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    Sign Up
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#232323",
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    text: {
        color: "#FFB400",
        textAlign: "center",
    },
    textLink: {
        color: "#FFB400",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
});
