import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, Keyboard } from "react-native";
import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import AccountInfo from "../../globalComponents/AccountInfo";
import {
    getBalance,
    makeTransference,
} from "../../services/userFeatures/account";
import { updateBalance } from "../../store/user";

export default function TransferScreen() {
    const userAccount = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    async function validate() {
        Keyboard.dismiss();
        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{1,8}$/g;
        const amountRegex = /^[0-9]{1,}$/g;

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
                "Account Number cannot contain letters and should have 6 digits or more",
                "account"
            );
            valid = false;
        }

        if (!amount) {
            handleError("Please input the amount", "amount");
            valid = false;
        } else if (amount <= 0) {
            handleError("Amount cannot be negative or null", "amount");
            valid = false;
        } else if (!amountRegex.test(amount)) {
            handleError(
                "Amount cannot contain letters or simbols()$$$;",
                "amount"
            );
            valid = false;
        } else if (amount > userAccount.balance) {
            handleError("Insufficient funds", "amount");
            valid = false;
        }

        if (valid) {
            await transfer();
        }
    }

    async function transfer() {
        const response = await makeTransference({
            destiny_account_number: account,
            destiny_agency_number: agency,
            value: amount,
        });

        if (response == "sucess") {
            const newBalance = await getBalance();
            dispatch(updateBalance(newBalance.data));
            Alert.alert("Transfer sucessful");
        } else {
            Alert.alert(response);
        }
    }

    return (
        <>
            <View style={styles.screen}>
                <AccountInfo />
                <View style={styles.inputs}>
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
                        placeholder={"Amount"}
                        onChangeText={setAmount}
                        keyboardType={"numeric"}
                        error={errors.amount}
                        onFocus={() => {
                            handleError(null, "amount");
                        }}
                    />

                    <Button label={"Transfer"} onPress={validate} />
                </View>
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
        alignItems: "center",
    },
    text: {
        color: "#FFB400",
        textAlign: "center",
    },
    inputs: {
        padding: 20,
        width: "90%",
        backgroundColor: "#474743",
        borderRadius: 10,
    },
});
