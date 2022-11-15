import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../store/user";

import Button from "../../globalComponents/Button";
import Input from "../../globalComponents/Input";

export default function LogIn() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    async function validate() {
        Keyboard.dismiss();

        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{1,8}$/g;
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
                "Account Number cannot contain letters and should have 8 digits or less",
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
        dispatch(
            userLogin({
                agency: agency,
                checking_account: account,
                password: password,
            })
        );
        //console.log(response);
        //dispatch(setUser({ name: "rafefo", age: 23 }));
        //navigation.navigate("SignUp");
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
