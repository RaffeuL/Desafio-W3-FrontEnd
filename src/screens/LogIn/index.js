import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Keyboard } from "react-native";
import Button from "../../globalComponents/Button";
import Input from "../../globalComponents/Input";

export default function LogIn() {
    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    function validate() {
        Keyboard.dismiss();

        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{1,8}$/g;

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
                "Account Number cannot contain letters and should have 8 digits or less",
                "account"
            );
            valid = false;
        }

        if (!password) {
            handleError("Please input your password", "password");
            valid = false;
        } else if (password.length < 8) {
            handleError(
                "The password should have more than 8 characters",
                "password"
            );
            valid = false;
        }

        if (valid) {
            login();
        }
    }

    function login() {
        if (
            agency === "1234" &&
            account === "12345678" &&
            password === "12345678"
        ) {
            navigation.navigate("TransferScreen");
        } else {
            Alert.alert("Error", "Invalid credentials");
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
                    Sign In
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
