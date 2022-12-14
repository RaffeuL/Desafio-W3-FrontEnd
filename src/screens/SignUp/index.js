import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard, Alert } from "react-native";
import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { openAccount } from "../../services/userFeatures/account";

export default function SignUp() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    async function validate() {
        Keyboard.dismiss();

        let valid = true;
        const spaceRegex = /\s{2,}/;
        const nameRegex =
            /^[a-záàâãéèêíïóôõöúçñ]+([\ a-záàâãéèêíïóôõöúçñ]+$)/gi;
        const cpfRegex = /^[0-9]{11}$/g;
        const passwordRegex = /^(?!.(.).\1)[0-9]+$/;

        if (!name) {
            handleError("Please input your name", "name");
            valid = false;
        } else if (!nameRegex.test(name) || spaceRegex.test(name)) {
            handleError(
                "Name cannot contain numbers, simbols or more than one space",
                "name"
            );
            valid = false;
        }

        if (!cpf) {
            handleError("Please input your CPF", "cpf");
            valid = false;
        } else if (!cpfRegex.test(cpf)) {
            handleError(
                "CPF cannot contain letters or simbols and should have 11 numbers",
                "cpf"
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

        if (password !== confirmPassword) {
            handleError("Passwords are different", "confirmPassword");
            valid = false;
        }

        if (valid) {
            await signIn();
        }
    }

    async function signIn() {
        const resposne = await openAccount({
            name: name,
            birth_date: "1999-01-01",
            cpf: cpf,
            password: password,
            email: "email@email.com",
        });
        if (resposne.status == "sucess") {
            Alert.alert("Sucess", resposne.data.message);
        } else {
            Alert.alert(resposne);
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Sign Up</Text>
            <Input
                placeholder={"Name"}
                iconName={"account-circle"}
                onChangeText={setName}
                error={errors.name}
                onFocus={() => handleError(null, "name")}
            />
            <Input
                placeholder={"CPF: 12345678900"}
                iconName={"card-account-details"}
                onChangeText={setCpf}
                keyboardType={"numeric"}
                maxLength={11}
                error={errors.cpf}
                onFocus={() => handleError(null, "cpf")}
            />
            <Input
                placeholder={"Password"}
                iconName={"lock"}
                isHide={true}
                onChangeText={setPassword}
                error={errors.password}
                onFocus={() => handleError(null, "password")}
            />
            <Input
                placeholder={"Confirm the password"}
                iconName={"lock"}
                isHide={true}
                onChangeText={setConfirmPassword}
                error={errors.confirmPassword}
                onFocus={() => handleError(null, "confirmPassword")}
            />
            <Button label={"Sign Up"} onPress={validate} />
            <Button
                label={"Log In"}
                onPress={() => navigation.navigate("LogIn")}
            />
        </View>
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
});
