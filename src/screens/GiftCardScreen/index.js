import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Keyboard } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
    getStoresList,
    buyGiftCard,
} from "../../services/bankFeatures/gitCard";
import { useSelector } from "react-redux";

import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";
import AccountInfo from "../../globalComponents/AccountInfo";

export default function GiftCardScreen() {
    const userAccount = useSelector((state) => state.account);
    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");
    const [amount, setAmout] = useState("");
    const [stores, setStores] = useState([
        "Americanas",
        "Submarino",
        "Shoptime",
        "Extra",
        "Ponto Frio",
    ]);
    const [selectedStore, setSelectedStore] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function getStores() {
            const response = await getStoresList();
            if (response.status == "sucess") {
                setStores(response.data);
            } else {
                Alert.alert(response);
            }
        }

        getStores();
    }, []);

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    async function validate() {
        Keyboard.dismiss();
        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{6,}$/g;
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
            handleError("Amount cannot contain letters or simbols", "amount");
            valid = false;
        } else if (amount > 10) {
            handleError("Insufficient funds", "amount");
            valid = false;
        }
        if (!selectedStore) {
            handleError("Please select a store", "store");
            valid = false;
        }
        if (valid) {
            await buy();
        }
    }

    function validadeMyAccount() {
        if (
            agency == userAccount.agency.number &&
            account == userAccount.account_number
        ) {
            return true;
        }
        return false;
    }

    async function buy() {
        if (validadeMyAccount()) {
            const response = await buyGiftCard(selectedStore, amount);
            if (response.status == "sucess") {
                Alert.alert("Gift Card bought sucessfully", response.data);
            } else {
                Alert.alert(response);
            }
        } else {
            Alert.alert("Error", "Invalid credentials");
        }
    }

    return (
        <View style={styles.screen}>
            <AccountInfo />
            <View style={styles.inputs}>
                <Text style={styles.text}>Gift Card Screen</Text>
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
                    onChangeText={setAmout}
                    keyboardType={"numeric"}
                    error={errors.amount}
                    onFocus={() => {
                        handleError(null, "amount");
                    }}
                />
                <Picker
                    selectedValue={selectedStore}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedStore(itemValue)
                    }
                    style={styles.picker}
                    onFocus={() => {
                        handleError(null, "store");
                    }}
                >
                    <Picker.Item label={"Select a store"} value={null} />
                    {stores.map((store) => {
                        return (
                            <Picker.Item
                                label={store.name}
                                value={store.id}
                                key={store.id}
                            />
                        );
                    })}
                </Picker>
                {errors.store && (
                    <Text style={{ color: "red", alignSelf: "center" }}>
                        {errors.store}
                    </Text>
                )}
                <Button label={"Buy Gift Card"} onPress={validate} />
            </View>
        </View>
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
    inputs: {
        padding: 20,
        width: "90%",
        backgroundColor: "#474743",
        borderRadius: 10,
    },
    text: {
        color: "#FFB400",
        textAlign: "center",
    },
    picker: {
        marginTop: 10,
        backgroundColor: "#5e5d58",
        height: 50,
        width: "80%",
        alignSelf: "center",
        color: "#FFB400",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFB400",
    },
});
