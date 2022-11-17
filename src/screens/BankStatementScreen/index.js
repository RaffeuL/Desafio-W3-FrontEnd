import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, Keyboard } from "react-native";
import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";
import DateSelector from "./components/DateSelector";
import OptionsNavigation from "../../globalComponents/OptionsNavigation";

export default function BankStatementScreen() {
    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");

    const [showInitialDate, setShowInitialDate] = useState(false);
    const [showFinalDate, setShowFinalDate] = useState(false);

    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();

    const [errors, setErrors] = useState({});

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    function onChangeInitialDate(event, selectedDate) {
        const currentDate = selectedDate;
        setShowInitialDate(false);
        setInitialDate(currentDate);
    }
    function onChangeFinalDate(event, selectedDate) {
        const currentDate = selectedDate;
        setShowFinalDate(false);
        setFinalDate(currentDate);
    }

    function showMode(isInitialDate) {
        if (isInitialDate) {
            setShowInitialDate(true);
            handleError("", "initialDate");
        } else {
            setShowFinalDate(true);
            handleError("", "finalDate");
        }
    }

    function validate() {
        Keyboard.dismiss();
        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{1,8}$/g;

        if (!agency) {
            handleError("Please input the agency", "agency");
            valid = false;
        } else if (!agencyRegex.test(agency)) {
            handleError(
                "Agency cannot contain letters and should have 4 digits",
                "agency"
            );
            valid = false;
        }

        if (!account) {
            handleError("Please input the account", "account");
            valid = false;
        } else if (!accountRegex.test(account)) {
            handleError(
                "Account Number cannot contain letters and should have 8 digits",
                "account"
            );
            valid = false;
        }
        if (!initialDate) {
            handleError("Please select the initial date", "initialDate");
            valid = false;
        }

        if (!finalDate) {
            handleError("Please select the final date", "finalDate");
            valid = false;
        } else if (finalDate.getTime() < initialDate.getTime()) {
            handleError(
                "Final date cannot be before initial date",
                "finalDate"
            );
            valid = false;
        }

        if (valid) {
            statement();
        }
    }

    function statement() {
        if (agency === "1234" && account === "12345678") {
            Alert.alert("Statement", `R$ 1000,00`);
        } else {
            Alert.alert("Error", "Invalid credentials");
        }
    }

    return (
        <>
            <View style={styles.screen}>
                <Text style={styles.text}>Bank Statement Screen</Text>
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
                <DateSelector
                    buttonLabel={"Initial Date"}
                    date={initialDate}
                    onChange={onChangeInitialDate}
                    show={showInitialDate}
                    onPress={() => showMode(true)}
                    error={errors.initialDate}
                />
                <DateSelector
                    buttonLabel={"Final Date"}
                    date={finalDate}
                    onChange={onChangeFinalDate}
                    show={showFinalDate}
                    onPress={() => showMode(false)}
                    error={errors.finalDate}
                />
                <Button label={"Check"} onPress={validate} />
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
});
